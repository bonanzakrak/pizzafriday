const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')

// Get user data from database
//
router.get('/', (req, res, next) => {
  req
    .db
    .User
    .find({})
    .exec()
    .then(res.json.bind(res))
    .catch(next)

})

router.get('/:user', (req, res, next) => {
  req
    .db
    .User
    .findOne({id: req.params.user})
    .exec()
    .then(res.json.bind(res))
    .catch(next)

})

router.post('/', (req, res, next) => {
  req
    .db
    .User
    .findOneAndUpdate({
      id: req.body.user
    }, {
      $set: {
        admin: req.body.admin
      }
    }, {
      upsert: false,
      new: true
    })
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router
