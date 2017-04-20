/**
 * MaintenanceController
 *
 * @description :: Server-side logic for managing Maintenances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MaintenanceController = {

    index: function(req, res) {
        Maintenance.find().exec(function(err, maintenances) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(maintenances);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Maintenance.create(paramaters).exec(function(err, maintenance) {
            if (err) { return res.serverError(err); }
            return res.json(maintenance);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Maintenance.find({ Id: parameters.Id }).exec(function(err, maintenanceOriginal) {
            if (err) { return res.serverError(err); }
            maintenanceOr = {
                Description: maintenanceOriginal[0].Description,
            }
            Maintenance.update(maintenanceOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Maintenance.destroy({
            id: Id
        }).exec(function(err, maintenance) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(maintenance[0].Id);
        });
    }

}


module.exports = MaintenanceController;

