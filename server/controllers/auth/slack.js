const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const jwt = require('jsonwebtoken')
//const secret = '9qRHW@tgh:A<@cuR4CpLG7p#/&w&?'
const config = require('../../config')

// slack authentication hook. Redirects to slack page
router.get('/', passport.authenticate('oauth2'))

// slack auth callback
router.get('/callback', passport.authenticate('oauth2', {failureRedirect: '/#/failed'}), (req, res) => {
  // Successful authentication, redirect home.
  res.cookie('jwt', jwt.sign({
    id: req.user.id
  }, config.jwt.secret))
  res.redirect('/#/order')
})

module.exports = router