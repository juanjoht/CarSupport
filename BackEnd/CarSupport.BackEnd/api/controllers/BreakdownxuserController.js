/**
 * BreakdownxuserController
 *
 * @description :: Server-side logic for managing Breakdownxusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var BreakdownxuserController = {

    index: function(req, res) {
        Breakdownxuser.find().exec(function(err, breakdownxusers) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(breakdownxusers);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Breakdownxuser.create(paramaters).exec(function(err, breakdownxuser) {
            if (err) { return res.serverError(err); }
            return res.json(breakdownxuser);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Breakdownxuser.find({ Id: parameters.Id }).exec(function(err, breakdownxuserOriginal) {
            if (err) { return res.serverError(err); }
            breakdownxuserOr = {
                Breakdown: parameters.Breakdown,
                User: parameters.User,
            }
            Breakdownxuser.update({ Id: parameters.Id }, BreakdownxuserOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Breakdownxuser.destroy({
            id: Id
        }).exec(function(err, Breakdownxuser) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(Breakdownxuser[0].Id);
        });
    }

}


module.exports = BreakdownxuserController;

