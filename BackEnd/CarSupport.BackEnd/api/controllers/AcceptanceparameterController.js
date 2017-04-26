/**
 * AcceptanceparameterController
 *
 * @description :: Server-side logic for managing Acceptanceparameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


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