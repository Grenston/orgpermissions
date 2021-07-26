const readline = require("readline");
const { Octokit } = require("@octokit/rest");
const config = require('./config.json');
async function set_rules(){
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
            await github.request('PATCH /orgs/{org}', {
                org: org,
                billing_email: 'grenston.george@ecanarys.com'
            })       
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        });
        rl.close();
    });

    rl.on("close", function() {
        console.log("\n----------------------------------------------");
        console.log("\n**********Developed by Grenston !!!***********");
        console.log("\n----------------------------------------------");
        process.exit(0);
    });
}
set_rules()