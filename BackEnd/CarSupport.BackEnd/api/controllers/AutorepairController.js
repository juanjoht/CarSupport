/**
 * AutorepairController
 *
 * @description :: Server-side logic for managing Autorepairs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var AutorepairController = {

    index: function(req, res) {
        Autorepair.find().exec(function(err, autorepairs) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(autorepairs);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Autorepair.create(paramaters).exec(function(err, autorepair) {
            if (err) { return res.serverError(err); }
            return res.json(autorepair);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Autorepair.find({ Id: parameters.Id }).exec(function(err, autorepairOriginal) {
            if (err) { return res.serverError(err); }
            autorepairOr = {
                Name: parameters.Name,
                Address: parameters.Address,
                Phone: parameters.Phone,
                Location: parameters.Solutions,
                Breakdown: parameters.Breakdown,
            }
            Autorepair.update({ Id: parameters.Id }, autorepairOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Autorepair.destroy({
            id: Id
        }).exec(function(err, autorepair) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(autorepair[0].Id);
        });
    }

}


module.exports = AutorepairController;

