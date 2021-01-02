const fs = require('fs');
const crypto = require('crypto');

if (process.argv.length <= 3) {
    console.error("adduser user password");
    return;
}

let allUsers = [];
let username = process.argv[2];
let password = process.argv[3];

if (fs.existsSync('users.json')) {
    // parse users.json
    allUsers = JSON.parse(fs.readFileSync('users.json'));
    allUsers.forEach(element => {
        if (element.username === username) {
            console.error(`user "${username}" already exists`);
        }
    });
}
let salt = crypto.randomBytes(16).toString('hex');
let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

// find an unused random uid
let uid;
do {
    uid = crypto.randomInt(10000);
} while (allUsers.find((element) => element.uid == uid));

allUsers.push({
    uid: uid,
    username: username,
    hash: hash,
    salt: salt
});

fs.writeFileSync('users.json', JSON.stringify(allUsers), { mode: 0600 });
