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
            return res.json(questions);
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
        Question.find({ Id: parameters.Id }).exec(function(err, questionOriginal) {
            if (err) { return res.serverError(err); }
            questionOr = {
                Description: parameters.Description,
                Part: parameters.Part,
            }
            Question.update({ Id: parameters.Id } ,questionOr).exec(function afterwards(err, updated) {
                if (err) { return res.serverError(err); }
                return res.json(updated[0]);
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
    },
    uploadImage1: function(req, res) {
        req.file('UploadImage1').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadImage2: function(req, res) {
        req.file('UploadImage2').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadImage3: function(req, res) {
        req.file('UploadImage3').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadImage4: function(req, res) {
        req.file('UploadImage4').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    }

}


module.exports = QuestionController;