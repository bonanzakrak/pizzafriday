
var dbUrl = 'mongodb://@127.0.0.1:27017/food';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var models = require('../models');

module.exports = function db (req, res, next) {
  req.db = {
    User: models.User
  };
  return next();
}
mongoose.connect(dbUrl);
