/**
 * ModelController
 *
 * @description :: Server-side logic for managing Models
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ModelController = {

    index: function(req, res) {
        Model.find().exec(function(err, models) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(models);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Model.create(paramaters).exec(function(err, model) {
            if (err) { return res.serverError(err); }
            return res.json(model);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Model.find({ Id: parameters.Id }).exec(function(err, modelOriginal) {
            if (err) { return res.serverError(err); }
            modelOr = {
                Description: parameters.Description,
                Brand: parameters.Brand,
               
            }
            Model.update({ Id: parameters.Id }, modelOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Model.destroy({
            id: Id
        }).exec(function(err, model) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(model[0].Id);
        });
    }

}


module.exports = ModelController;
