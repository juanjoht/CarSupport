/**
 * SuggestionController
 *
 * @description :: Server-side logic for managing Suggestions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var SuggestionController = {

    index: function(req, res) {
        Suggestion.find().exec(function(err, suggestions) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(suggestions);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Suggestion.create(paramaters).exec(function(err, suggestion) {
            if (err) { return res.serverError(err); }
            return res.json(suggestion);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Suggestion.find({ Id: parameters.Id }).exec(function(err, suggestionOriginal) {
            if (err) { return res.serverError(err); }
            suggestionOr = {
                Description: parameters.Description,
                Url: parameters.Url,
                Proccess: parameters.Proccess,
            }
            Suggestion.update({ Id: parameters.Id }, suggestionOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Suggestion.destroy({
            id: Id
        }).exec(function(err, suggestion) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(suggestion[0].Id);
        });
    }

}


module.exports = SuggestionController;