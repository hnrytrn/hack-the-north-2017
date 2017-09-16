var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.route('/user')
    // Create new user
    .post(function(req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err) response.send(err);
            return res.json({User: user});
        });
    }); 

router.route('/user/:id')
    // Update existing user
    .put(function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            if (err) response.send(err);
            return res.json({User: user});
        });
    }); 

router.route('/login')
    .post(function(req, res) {
        User.findOne({"email": req.body.email, "password": req.body.password}, function(err, user) {
            if (err) response.send(err);
            return res.json({User: user});
        })
    })

module.exports = router;