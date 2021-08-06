const readline = require("readline");
const { Octokit } = require("@octokit/rest");
const config = require('./config.json');

async function set_org_rules(GH_PAT,organization) {
    const { Octokit } = require("@octokit/rest");
    const github = new Octokit({
        auth: GH_PAT
    });
    return github.request('PATCH /orgs/{org}', {
        headers: {
            Accept: 'application/vnd.github.surtur-preview+json'
        },
        org: organization,
        members_can_create_internal_repositories: true,
        members_can_create_private_repositories: false,
        members_can_create_public_repositories: false
    })
    .then(response => {
        return response
    });
}

function set_rules() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log('AUTOMATE ORGS');
    rl.question("Enter your pat: ", async function(GH_PAT) {
        for (org of config.orgnames){
            res = await set_org_rules(GH_PAT,org);
            console.log(res);
        }
        console.log("\n--------------------------------------------");
        console.log("\n********** Developed by Grenston ***********");
        console.log("\n--------------------------------------------");
        rl.close()
    });
}

set_rules()

