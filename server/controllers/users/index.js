const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const db = require('../../modules/db')
const orderParser = require('../../modules/group')

// Get user data from database
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  req
    .db
    .User
    .find({})
    .exec()
    .then(function(users) {
      res.json(users)
    })
    .catch(function(err) {
      console.error(err)
    })

})

module.exports = router
