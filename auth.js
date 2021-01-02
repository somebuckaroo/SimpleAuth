const fs = require('fs');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

function passwordValidate(password, hash, salt) {
    var newHash = crypto.pbkdf2Sync(password, salt, 1000, 64,
        `sha512`).toString(`hex`);
    return newHash === hash;
};

module.exports = function (passport) {
    let allUsers = JSON.parse(fs.readFileSync('users.json'));

    passport.use(new LocalStrategy(
        {
            passReqToCallback: true
        },
        (req, username, password, done) => {
            const error_msg = 'Invalid user or password.';
            let user = allUsers.find((element) => element.username == username);
            if (!user) {
                console.log(`invalid user: "${username}"`);
                return done(null, false, { message: error_msg });
            }
            else if (!passwordValidate(password, user.hash, user.salt)) {
                console.log(`invalid password for user "${username}"`);
                return done(null, false, { message: error_msg });
            }
            else
                return done(null, user);    // Return the user
        }));

    passport.serializeUser(function (user, done) {
        done(null, user.uid);
    });

    passport.deserializeUser(function (uid, done) {
        let user = allUsers.find((element) => element.uid == uid);
        done(null, user);
    });
}