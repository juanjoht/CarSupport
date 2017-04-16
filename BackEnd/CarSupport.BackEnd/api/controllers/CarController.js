/**
 * CarController
 *
 * @description :: Server-side logic for managing Cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CarController = {

    index: function(req, res) {
        Car.find().exec(function(err, cars) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(cars);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Car.create(paramaters).exec(function(err, car) {
            if (err) { return res.serverError(err); }
            return res.json(car);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Car.find({ Id: parameters.Id }).exec(function(err, carOriginal) {
            if (err) { return res.serverError(err); }
            carOr = {
                LicensePlate: carOriginal[0].LicensePlate,
                Year: carOriginal[0].Year,
                CurrentMileage: carOriginal[0].CurrentMileage,
                FuelType: carOriginal[0].FuelType,
                Class: carOriginal[0].Class,
                Model: carOriginal[0].Model,
                User: carOriginal[0].User,
            }
            Car.update(carOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Car.destroy({
            id: Id
        }).exec(function(err, car) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(car[0].Id);
        });
    }

}


module.exports = CarController;