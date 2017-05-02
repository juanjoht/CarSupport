/**
 * BrandController
 *
 * @description :: Server-side logic for managing Brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var BrandController = {

    index: function(req, res) {
        Brand.find().exec(function(err, brands) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(brands);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Brand.create(paramaters).exec(function(err, brand) {
            if (err) { return res.serverError(err); }
            return res.json(brand);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Brand.find({ Id: parameters.Id }).exec(function(err, brandOriginal) {
            if (err) { return res.serverError(err); }
            brandOr = {
                Description: parameters.Description,
            }
            Brand.update({ Id: parameters.Id }, brandOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Brand.destroy({
            id: Id
        }).exec(function(err, brand) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(brand[0].Id);
        });
    }

}


module.exports = BrandController;