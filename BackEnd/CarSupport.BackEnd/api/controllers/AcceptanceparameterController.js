/**
 * AcceptanceparameterController
 *
 * @description :: Server-side logic for managing Acceptanceparameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

<<<<<<< HEAD

var AcceptanceparameterController = {
    index: function(req, res) {
        var responses = req.param('param');
        Acceptanceparameter.query('CALL Sp_getBreakdownResponses("' + responses + '") ', function(err, result) {
            if (err) {
                res.serverError(err);
            } else {
                res.json(result);
            }
        });
    },
    findBy: function(req, res) {
        var id = req.allParams();
        Acceptanceparameter.find({ Breakdown: id.param }).exec(function(err, accept) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(accept);
        });
    }
}


module.exports = AcceptanceparameterController;
=======
var AcceptanceparameterController = {

    index: function(req, res) {
        Acceptanceparameter.find().exec(function(err, acceptanceparameters) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(acceptanceparameters);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Acceptanceparameter.create(paramaters).exec(function(err, acceptanceparameter) {
            if (err) { return res.serverError(err); }
            return res.json(acceptanceparameter);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Acceptanceparameter.find({ Id: parameters.Id }).exec(function(err, acceptanceparameterOriginal) {
            if (err) { return res.serverError(err); }
            acceptanceparameterOr = {
                Breakdown: parameters.Breakdown,
                Question: parameters.Question,
                Responseoption: parameters.Responseoption,
                
            }
            Acceptanceparameter.update({ Id: parameters.Id }, acceptanceparameterOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Acceptanceparameter.destroy({
            id: Id
        }).exec(function(err, acceptanceparameter) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(acceptanceparameter[0].Id);
        });
    }

}


module.exports = AcceptanceparameterController;
>>>>>>> a7c7ee99f5fd778e104674bd7c82a8e9596e9a74
