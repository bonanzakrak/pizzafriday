const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const db = require('../../modules/db')
const orderParser = require('../../modules/group')

router.use('/slack', require('./slack'))

// Get user data from database
router.get('/session', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  let $scope = {
    authenticated: req.isAuthenticated(),
    user: req.user
  }

  db
    .getActiveRestaurants()
    .then(orderParser.activeRestaurantsSort.bind(null, $scope))
    .then(db.getRestaurants)
    .then(orderParser.bindRestaurants.bind(null, $scope))
    .then(db.getUserOrders.bind(null, req.user.id, $scope))
    .then(orderParser.usersOrders.bind(null, $scope))
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router
