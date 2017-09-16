var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.route('/user')
    // Create new user
    .post(function(req,res) {
        console.log(req.body);
        var user = new User(req.body);
        user.save(function (error) {
            if (error) response.send(error);
            return res.json({User: user});
        });
    }) 

module.exports = router;