/**
 * BreakdownController
 *
 * @description :: Server-side logic for managing Breakdowns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var BreakdownController = {
    index: function(req, res) {
        Breakdown.find().populate('Part').exec(function(err, breakdowns) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(breakdowns);
        });
    },
    findBy: function(req, res) {
        var paramaters = req.allParams();
        var id = parseInt(paramaters.id)
        Breakdown.find({ Part: id }).populate('Part').exec(function(err, breakdowns) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(breakdowns);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Breakdown.create(paramaters).exec(function(err, breakdown) {
            if (err) { return res.serverError(err); }
            return res.json(breakdown);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Breakdown.find({ Id: parameters.Id }).exec(function(err, breakdownOriginal) {
            if (err) { return res.serverError(err); }
            breakdownOr = {
                Description: breakdownOriginal[0].Description,
                Causes: breakdownOriginal[0].Causes,
                Consequences: breakdownOriginal[0].Consequences,
                Solutions: breakdownOriginal[0].Solutions,
                Rating: breakdownOriginal[0].Rating,
                Part: breakdownOriginal[0].Part,
            }
            Breakdown.update(breakdownOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Breakdown.destroy({
            id: Id
        }).exec(function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(breakdown[0].Id);
        });
    }

}


module.exports = BreakdownController;