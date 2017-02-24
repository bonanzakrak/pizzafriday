const express = require('express')
const router = express.Router()
const passport = require('../modules/passport')
const db = require('../modules/db')
const orderParser = require('../modules/group')

router.use('/auth', require('./auth'))

router.post('/restaurants/save',passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .setRestaurant(req.body)
    .then(restaurant => db.getRestaurants())
    .then(res.json.bind(res))
    .catch(next)
})


router.post('/save', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .upsertOrder(req.user, req.body)
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/userOrders', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const user = req.user.id
  db
    .getUsersPastOrders(user)
    .then(res.json.bind(res))
    .catch(next)
})

router.post('/saveActiveRestaurants', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  db
    .setActiveRestaurants(req.body)
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/orders', (req, res, next) => {
  db
    .getOrders()
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

router.get('*', (req, res) => {
  res.render('index')
})

module.exports = router