/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
module.exports = {

    /**
     * `AuthController.login()`
     */
    login: function(req, res) {
        res.view();
    },


    /**
     * `AuthController.process()`
     */
    process: function(req, res) {
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
    },


    /**
     * `AuthController.logout()`
     */
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};