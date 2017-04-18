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
            return res.json(parts);
        });
    }
}

module.exports = PartController;