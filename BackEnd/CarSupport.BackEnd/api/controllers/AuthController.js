/**
 * AuthController
 * @author:: Juan Hincapie
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
module.exports = {

    /**
     * `AuthController.login()`
     */
    login: function(req, res) {
        res.view('');
    },


    /**
     * `AuthController.process()`
     */
    process: function(req, res) {
        if (req.body.isApp) {
            passport.authenticate('local', function(err, user, info) {
                if ((err) || (!user)) {
                    return res.json({ error: info.message });
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return res.json({ error: info.message });
                    }
                    return res.json({ account: user});

                });
            })(req, res);
        } else {
            passport.authenticate('local', function(err, user, info) {
                if ((err) || (!user)) {
                    res.redirect('/login');
                    return;
                }

                req.logIn(user, function(err) {
                    if (err) {
                        res.redirect('/login');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
        }
    },


    /**
     * `AuthController.logout()`
     */
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};