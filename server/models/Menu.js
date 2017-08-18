const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  name: String,
  altName: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  price: Number,
  idx: Number
})