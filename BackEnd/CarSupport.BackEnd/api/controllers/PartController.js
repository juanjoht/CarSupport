/**
 * PartController
 *
 * @description :: Server-side logic for managing Parts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var PartController = {
    index: function(req, res) {
        Part.find().exec(function(err, parts) {
            if (err) {
                return res.serverError(err);
            }
            return res.jsonp(parts);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Part.create(paramaters).exec(function(err, part) {
            if (err) { return res.serverError(err); }
            return res.json(part);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
       //console.log("body ", parameters)
        Part.find({ Id: parameters.Id }).exec(function(err, partOriginal) {
            if (err) { return res.serverError(err); }
            partOr = {
                Description: parameters.Description,
                ShowScheme: parameters.ShowScheme,
            }
            
            Part.update({ Id: parameters.Id }, partOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Part.destroy({
            id: Id
        }).exec(function(err, part) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(part[0].Id);
        });
    }

}
module.exports = PartController;
