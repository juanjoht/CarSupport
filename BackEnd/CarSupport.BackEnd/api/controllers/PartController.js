/**
 * PartController
 *
 * @description :: Server-side logic for managing Parts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var PartController = {
<<<<<<< HEAD

=======
>>>>>>> a086e9436c9e558608427e02508dd51dc87be4c8
    index: function(req, res) {
        Part.find().exec(function(err, parts) {
            if (err) {
                return res.serverError(err);
            }
<<<<<<< HEAD
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
        Part.find({ Id: parameters.Id }).exec(function(err, partOriginal) {
            if (err) { return res.serverError(err); }
            partOr = {
                Description: partOriginal[0].Description,
                ShowScheme: partOriginal[0].ShowScheme,
            }
            Part.update(partOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
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


=======
            return res.json(parts);
        });
    }
}
>>>>>>> a086e9436c9e558608427e02508dd51dc87be4c8

module.exports = PartController;