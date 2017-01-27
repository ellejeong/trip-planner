'use strict'

const express = require('express');
const router = express.Router();
// var models = require('../models');

var db = require('../models/index');
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');

module.exports = router;

router.get("/", function(req, res, next) {

    var outerScopeContainer = {};
    Hotel.findAll()
        .then(function(dbHotels) {
            outerScopeContainer.dbHotels = dbHotels;
            return Restaurant.findAll();
        })
        .then(function(dbRestaurants) {
            outerScopeContainer.dbRestaurants = dbRestaurants;
            return Activity.findAll();
        })
        .then(function(dbActivities) {
            res.render('index', {
                templateHotels: outerScopeContainer.dbHotels,
                templateRestaurants: outerScopeContainer.dbRestaurants,
                templateActivities: dbActivities
            });
        })
        .catch(next);
});