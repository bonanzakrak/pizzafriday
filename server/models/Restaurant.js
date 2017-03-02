const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  title: {
    type: String
  },
  website: {
    type: String
  }
})