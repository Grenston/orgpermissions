const readline = require("readline");
const { Octokit } = require("@octokit/rest");
const config = require('./config.json');
async function set_rules() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('AUTOMATE ORGS');
    rl.question("Enter your pat: ", async function(GH_PAT) {
        const github = new Octokit({
            auth: GH_PAT
        });
        config.orgnames.forEach(async org => {
            console.log('Patching... '+org)
            await github.request('PATCH /orgs/{org}', {
                headers: {
                    Accept: 'application/vnd.github.surtur-preview+json'
                },
                org: org,
                members_can_create_internal_repositories: true,
                members_can_create_private_repositories: false,
                members_can_create_public_repositories: false
            })
            .then(response => {
                console.log(response);
            })    
            .catch(error => {
                console.log(error.message);
            });
        });
        rl.close();
    });

    rl.on("close", function() {
        console.log("\n--------------------------------------------");
        console.log("\n********** Developed by Grenston ***********");
        console.log("\n--------------------------------------------");
        process.exit(0);
    });
}
set_rules()

