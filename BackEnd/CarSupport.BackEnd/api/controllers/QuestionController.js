/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var QuestionController = {

    index: function(req, res) {
        Question.find().exec(function(err, questions) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(users);
        });
    },
    add: function(req, res) {
        var paramaters = req.allParams();
        Question.create(paramaters).exec(function(err, question) {
            if (err) { return res.serverError(err); }
            return res.json(question);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        User.find({ Id: parameters.Id }).exec(function(err, questionOriginal) {
            if (err) { return res.serverError(err); }
            userOr = {
                Description: questionOriginal[0].Description,
                Part: questionOriginal[0].Part,
            }
            Question.update(questionOr, parameters).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return req.json(updated[0]);
            });
        });
    },
    delete: function(req, res) {
        var Id = req.param('Id');
        Question.destroy({
            id: Id
        }).exec(function(err, question) {
            if (err) {
                return res.negotiate(err);
            }
            return res.json(question[0].Id);
        });
    }

}


module.exports = QuestionController;

