const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const db = require('../../modules/db')

router.use('/active', require('./active'))

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .setRestaurant(req.body)
    .then(restaurant => db.getRestaurants())
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router