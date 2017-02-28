const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')

router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  req
    .db
    .Menu
    .find({})
    .exec()
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/:restaurant', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  req
    .db
    .Menu
    .find({restaurant:req.params.restaurant})
    .exec()
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router