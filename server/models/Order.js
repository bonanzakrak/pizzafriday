const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  "date": Date,
  "userId": String,
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "menu": {
    type: Schema.Types.ObjectId,
    ref: 'Menu'
  },
  "addon": {
    type: Schema.Types.ObjectId,
    ref: 'Addon'
  },
  "comment": String
})