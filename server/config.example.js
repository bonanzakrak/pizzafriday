var host = process.env.HOST || 'localhost'
var port = process.env.PORT || '1337'

module.exports = {
  db: 'mongodb://@127.0.0.1:27017/pizzafriday',
  jwt: {
    secret: 'YOUR_SECRET'
  },
  slack: {
    CLIENT_ID: 'slackApiClientId',
    CLIENT_SECRET: 'slackApiClientSecret',
    callbackUrl: 'http://'+ host + ':' + port + '/auth/slack/callback'
  }
}