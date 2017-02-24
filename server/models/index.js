const User = require('./User')
const mongoose = require('mongoose');

exports.User = mongoose.model('User', User, 'users');