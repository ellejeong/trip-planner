'use strict'

var Sequelize = require('sequelize');
var db = require('./index');
var Place = require('./place');

var Restaurant = db.define('restaurant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Restaurant.belongsTo(Place);

module.exports = Restaurant;