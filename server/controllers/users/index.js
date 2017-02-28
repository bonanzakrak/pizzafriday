const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')

// Get user data from database
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  req
    .db
    .User
    .find({})
    .exec()
    .then(res.json.bind(res))
    .catch(next)

})

module.exports = router
