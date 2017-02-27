
const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const models = require('../models')

module.exports = function db (req, res, next) {
  req.db = {
    User: models.User,
    ActiveRestaurant: models.ActiveRestaurant,
    Restaurant: models.Restaurant,
    Menu: models.Menu,
    Addon: models.Addon,
    Order: models.Order
  }
  return next()
}

mongoose.connect(config.db)
