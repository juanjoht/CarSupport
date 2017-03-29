// config/passport.js

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(account, done) {
    done(null, account.Id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ Id: id }).exec(function(err, account) {
        done(err, account);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }).exec(
            function(err, account) {
                if (err) { return done(err); }
                if (!account) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (account.Password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, account);
            });
    }
));