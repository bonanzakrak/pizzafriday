const express = require('express')
const router = express.Router()
const passport = require('../../modules/passport')
const async = require('async')
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  req
    .db
    .Menu
    .find({})
    .sort({
      idx: 1
    })
    .exec()
    .then(res.json.bind(res))
    .catch(next)
})

router.get('/:restaurant', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  if (!req.db.mongoose.Types.ObjectId.isValid(req.params.restaurant))
    return next(new Error('restaurant is not valid ObjectId'))
  else
    req
    .db
    .Menu
    .find({
      restaurant: req.params.restaurant
    })
    .sort({
      idx: 1
    })
    .exec()
    .then(res.json.bind(res))
    .catch(next)
})

router.post('/order', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  async.each(req.body, function (item, callback) {
    req
      .db
      .Menu
      .update({
        _id: item._id
      }, {
        $set: {
          idx: item.idx
        }
      }, {
        upsert: false
      })
      .then(function (data) {
        callback(null, data)
      })
      .catch(function (error) {
        callback(error, null)
      })
  }, function done() {
    res.send('ok')
  })

})


router.post('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  if (!req.db.mongoose.Types.ObjectId.isValid(req.params.id))
    return next(new Error('id is not valid ObjectId'))
  else {
    req
      .db
      .Menu
      .findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          name: req.body.name,
          altName: req.body.altName,
          price: req.body.price
        }
      }, {
        upsert: true,
        new: true
      })
      .then(res.json.bind(res))
      .catch(next)
  }
})


router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  if (!req.db.mongoose.Types.ObjectId.isValid(req.params.id))
    return next(new Error('id is not valid ObjectId'))
  else {
    req
      .db
      .Menu
      .remove({
        _id: req.params.id
      })
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/new/:id'
  /*, passport.authenticate('jwt', {
    session: false
  })*/
  , (req, res, next) => {
    console.log(req.params, req.body)
    if (!req.db.mongoose.Types.ObjectId.isValid(req.params.id))
      return next(new Error('id is not valid ObjectId'))
    else {
      const getId = (result) => {
        let maxId = 1;
        if (result.length === 1)
          maxId = result[0].idx+1;

        return maxId
      }

      req
        .db
        .Menu
        .find({
          restaurant: req.params.id
        })
        .sort({
          idx: -1
        })
        .limit(1)
        .exec()
        .then(getId)
        .then((maxId) => req
          .db
          .Menu
          .create({
            name: req.body.name,
            altName: req.body.altName,
            price: req.body.price,
            restaurant: req.params.id,
            idx: maxId
          }, {
            upsert: true,
            new: true
          }))
        .then(res.json.bind(res))
        .catch(next)


      /**/
    }
  })


module.exports = router
