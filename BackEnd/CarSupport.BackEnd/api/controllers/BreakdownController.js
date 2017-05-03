/**
 * BreakdownController
 *
 * @description :: Server-side logic for managing Breakdowns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var BreakdownController = {

    index: function(req, res) {
        Breakdown.find().exec(function(err, breakdowns) {
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
        //console.log("body ", parameters)
        Breakdown.find({ Id: parameters.Id }).exec(function(err, breakdownOriginal) {
            if (err) { return res.serverError(err); }
            breakdownOr = {
                Description: parameters.Description,
                Causes: parameters.Causes,
                Consequences: parameters.Consequences,
                Solutions: parameters.Solutions,
                Rating: parameters.Rating,
                Part: parameters.Part,
            }
            Breakdown.update({ Id: parameters.Id }, breakdownOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Breakdown.destroy({
            id: Id
        }).exec(function(err, breakdown) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(breakdown[0].Id);
        });
    }

}


module.exports = BreakdownController;