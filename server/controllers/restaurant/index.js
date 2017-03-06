const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const db = require('../../modules/db')

router.use('/active', require('./active'))

router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .getRestaurants()
    .then(res.json.bind(res))
    .catch(next)
})

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .setRestaurant(req.body)
    .then(() => db.getRestaurants())
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router