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
            return res.json(users);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        User.create(paramaters).exec(function(err, user) {
            if (err) { return res.serverError(err); }
            return res.json(user);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        User.find({ Id: parameters.Id }).exec(function(err, userOriginal) {
            if (err) { return res.serverError(err); }
            userOr = {
                FullName: userOriginal[0].FullName,
                Email: userOriginal[0].Email,
                Phone: userOriginal[0].Phone,
                CellPhone: userOriginal[0].CellPhone,
                Username: userOriginal[0].Username,
                Password: userOriginal[0].Password,
            }
            User.update(userOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        User.destroy({
            id: Id
        }).exec(function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(user[0].Id);
        });
    }

}


module.exports = UserController;