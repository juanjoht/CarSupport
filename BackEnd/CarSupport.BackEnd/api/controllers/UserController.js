/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UserController = {

    index: function (req, res) {
       console.log('entro')
        User.findAll(function(err, users){
            if (err) return res.send(err, 500);
                
            res.view({
                model: user 
            });
        });
    },
    'new': function(req,res) {
        res.view('/user/master');
    }
}


module.exports = UserController;

