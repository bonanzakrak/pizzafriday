module.exports = {
  db: 'localhost:27017/pizzafriday',
  jwt: {
    secret: 'YOUR_SECRET'
  },
  slack: {
    CLIENT_ID: 'slackApiClientId',
    CLIENT_SECRET: 'slackApiClientSecret',
    callbackUrl: 'http://localhost/auth/slack/callback'
  }
}