'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var models = require('./models');
var routes = require('./routes/trip-planner.js');
var db = require('./models/index');

// var Place = require('./models/place');
// var Hotel = require('./models/hotel');
// var Activity = require('./models/activity');
// var Restaurant = require('./models/restaurant');

var env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/", routes);


// app.listen('3000', function(req, res, next) {
//     console.log('Server is listening!')
// })


// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.send(err.message);
});


db.sync()
    .then(function() {
        app.listen('3000', function(req, res, next) {
            console.log('Server is listening!')
        })
    })
    .catch(console.error);







// db.Place.sync({ force: true })
//     .then(function() {
//         return db.Hotel.sync({ force: true });
//     })
//     .then(function() {
//         return db.Hotel.sync({ force: true });
//     })
//     .then(function() {
//         return db.Activity.sync({ force: true });
//     })
//     .then(function() {
//         return db.Restaurant.sync({ force: true });
//     })
//     .then(function() {
//         app.listen(3000, function() {
//             console.log("Server is listening on port 3000!");
//         })
//     })
//     .catch(console.error);