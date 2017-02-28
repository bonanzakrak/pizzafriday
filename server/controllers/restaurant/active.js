const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const db = require('../../modules/db')
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .setActiveRestaurants(req.body)
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router