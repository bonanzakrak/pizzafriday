const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  website: {
    type: String
  }
})