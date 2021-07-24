const readline = require("readline");
const { Octokit } = require("@octokit/rest");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('AUTOMATE ORGS');
rl.question("Enter your pat: ", function(GH_PAT) {
    const github = new Octokit({
        auth: GH_PAT
    });
    rl.close();
});

rl.on("close", function() {
    console.log("\n----------------------------------------------");
    console.log("\n**********Developed by Grenston !!!***********");
    console.log("\n----------------------------------------------");
    process.exit(0);
});