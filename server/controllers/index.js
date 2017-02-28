const express = require('express')
const router = express.Router()


router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/menu', require('./menu'))
router.use('/addon', require('./addon'))
router.use('/restaurant', require('./restaurant'))
router.use('/order', require('./order'))

router.get('*', (req, res) => {
  res.render('index')
})

module.exports = router