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
            if (err) { return res.serverError(err); } else {
                factors.forEach(function(factor, index) {
                    //Crear response
                });
            }
            return res.json(question);
        });
    },
    edit: function(req, res) {
        var parameters = req.allParams();
        Question.find({ Id: parameters.Id }).exec(function(err, questionOriginal) {
            if (err) { return res.serverError(err); }
<<<<<<< HEAD
            questionrOr = {
=======
            QuestionOr = {
>>>>>>> a086e9436c9e558608427e02508dd51dc87be4c8
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
    },
    uploadAudio1: function(req, res) {
        req.file('UploadAudio1').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/audio')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadAudio2: function(req, res) {
        req.file('UploadAudio2').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/audio')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadAudio3: function(req, res) {
        req.file('UploadAudio3').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/audio')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    },
    uploadAudio4: function(req, res) {
        req.file('UploadAudio4').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/audio')
        }, function(err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });
    }

}


module.exports = QuestionController;