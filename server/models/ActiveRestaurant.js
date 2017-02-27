const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  id: String,
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  ]
})