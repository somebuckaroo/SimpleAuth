const fs = require('fs');
const crypto = require('crypto');

if (process.argv.length != 3) {
    console.error("deluser user");
    return;
}

let username = process.argv[2];

// parse users.json
let users = JSON.parse(fs.readFileSync('users.json'));
newusers = users.filter(element => element.username !== username);
if (newusers.length == users.length) {
    console.error("user not found");
}
else {
    fs.writeFileSync('users.json', JSON.stringify(newusers));
}
