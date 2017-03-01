'use strict'

const express = require('express')
const passport = require('./modules/passport')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const app = express()

// response compression
app.use(compression())

// static content routes
app.use(express.static(path.join(__dirname, '/style')))
app.use(express.static(path.join(__dirname, '/dist')))

// request content body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// passport authentication
app.use(passport.initialize())

// setup view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// middlewares
app.use(require('./middlewares/error.js'))
app.use(require('./middlewares/db.js'))

// routing
app.use('/',require('./controllers'))

// lift server
const port = process.env.PORT || 1337
app.listen(port, () => {
  console.log('Server is running on http://localhost:'+port+' or http://127.0.0.1:'+port)
})


module.exports = app;