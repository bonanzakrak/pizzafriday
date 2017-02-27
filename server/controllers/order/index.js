const express = require('express')
const router = express.Router()
const db = require('../../modules/db')
const orderParser = require('../../modules/group')
const passport = require('../../modules/passport')

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .upsertOrder(req.user._id, req.body)
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/grouped', (req, res, next) => {
  db
    .getOrders()
    .then(orderParser.concatMenu)
    .then(orderParser.groupByRestaurant)
    .then(orderParser.reduceRestaurants)
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/', (req, res, next) => {
  db
    .getOrders()
    .then(res.json.bind(res))
    .catch(next)
})



module.exports = router
