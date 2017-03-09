const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  image_48: String,
  image_72: String,
  admin: {
    type: Boolean,
    default: false
  }
})