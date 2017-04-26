/**
 * ResponseoptionController
 *
 * @description :: Server-side logic for managing Responseoptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ResponseoptionController = {
    index: function(req, res) {
        var paramaters = req.allParams();
        var id = parseInt(paramaters.id)
        Responseoption.find({ Question: id }).populate('Question').exec(function(err, responses) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(responses);
        });
    }
}

module.exports = ResponseoptionController;