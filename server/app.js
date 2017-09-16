// HTTP server using Express to handle incoming requests
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan'); // helps log all requests
var mongoose = require('mongoose');
var multer = require('multer');
var cookieParser = require('cookie-parser'); // for handling cookies
var bodyParser = require('body-parser'); // for parsing request URL
var models = require('./models/models.js');
mongoose.connect("mongodb://localhost/hackthenorth");


// set up logger and parsers
app.use(logger('dev')); // set up logger and parsers
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(cookieParser());

// Our ReST API
var api = require('./api');
app.use('/api', api);

// Function to handle client errors
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// start the server
app.listen(process.env.PORT ||8080, function () {
    console.log('Server listening!');
});


module.exports = app; 
