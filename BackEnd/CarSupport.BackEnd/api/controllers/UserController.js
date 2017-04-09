/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UserController = {

    index: function(req, res) {
        User.find().exec(function(err, users) {
            if (err) {
                return res.serverError(err);
            }
            //sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
            return res.json(users);
        });
    },
    add: function(req, res) {
        var paramater1 = req.allParams();
        var paramater2 = req.body;
        User.create({ name: 'Finn' }).exec(function(err, finn) {
            if (err) { return res.serverError(err); }

            sails.log('Finn\'s id is:', finn.id);
            return res.ok();
        });
    }

}


module.exports = UserController;