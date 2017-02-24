
const config = require('../config')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const request = require('request')
const db = require('./db');

passport.serializeUser(db.upsertUser)

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://slack.com/oauth/authorize',
  tokenURL: 'https://slack.com/api/oauth.access',
  clientID: config.slack.CLIENT_ID,
  clientSecret: config.slack.CLIENT_SECRET,
  callbackURL: config.slack.callbackUrl,
  scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
}, (accessToken, refreshToken, profile, cb) => {
  request('https://slack.com/api/users.identity?token=' + accessToken, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      return cb(null, JSON.parse(body).user)
    }
  })
}))

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
opts.secretOrKey = config.jwt.secret

passport.use(new JwtStrategy(opts, db.getUser))

module.exports = passport