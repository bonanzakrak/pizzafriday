const mongo = require('mongodb')
const monk = require('monk')
const config = require('../config')
const db = monk(config.db)

const moment = require('moment')
const lodash = require('lodash')
module.exports = {
  db,
  upsertUser: (user, cb) => {
    //this is from passport - required CB
    const collection = db.get('users')
    collection.findOneAndUpdate({
      id: user.id
    }, {
      $set: {
        user
      }
    }, {upsert: true}).then((result) => {
      cb(null, result._id)
    }).catch((error) => cb(error, null))
  },
  getUser: (payload, cb) => {
    //this is from passport - required CB
    const collection = db.get('users')

    collection
      .find({id: payload.id})
      .then((result) => {
        if (result.length === 1)
          cb(null, result[0])
        else
          cb(null, null)
      })
      .catch((error) => cb(error, null))
  },
  upsertOrder(user, action) {
    const collection = db.get('orders')

    let update = {
      user: lodash.pick(user.user, 'image_48', 'id', 'name')
    }

    switch (action.type) {
      case('SELECT_MENU'):
        {
          update = {
            $set: {
              menu: action.payload,
              user: lodash.pick(user.user, 'image_48', 'id', 'name')
            }
          }
          break
        }
      case('SELECT_ADDON'):
        {
          update = {
            $set: {
              addon: action.payload,
              user: lodash.pick(user.user, 'image_48', 'id', 'name')
            }
          }
          break
        }
      case('ADD_COMMENT'):
        {
          update = {
            $set: {
              comment: action.payload,
              user: lodash.pick(user.user, 'image_48', 'id', 'name')
            }
          }
          break
        }
      case('REMOVE_ADDON'):
        {
          update = {
            $unset: {
              addon: true
            }
          }
          break
        }
    }

    return collection.findOneAndUpdate({
      userId: user.id,
      date: moment()
        .startOf('day')
        .toDate()
    }, update, {upsert: true})
  },
  getUserOrders: (userId, scope) => {
    if (scope.authenticated) {
      const collection = db.get('orders')

      return collection.find({
        userId: userId,
        date: moment()
          .startOf('day')
          .toDate()
      })
    }
    return []
  },
  getOrders: () => {
    const collection = db.get('orders')

    return collection.find({
      date: moment()
        .startOf('day')
        .toDate()
    })
  },
  getUsersPastOrders: (userId) => {
    const collection = db.get('orders')

    return collection.find({
      userId: userId,
      date: {
        $ne: moment()
          .startOf('day')
          .toDate()
      }
    })
  },
  setActiveRestaurants: (restaurants) => {
    const collection = db.get('activeRestaurants')

    return collection.findOneAndUpdate({
      id: 'active'
    }, {
      $set: {
        restaurants
      }
    }, {upsert: true})
  },
  getActiveRestaurants: () => {
    const collection = db.get('activeRestaurants')

    return collection.find({})
  },
  setRestaurant: (data) => {
    const restaurant = data.payload
    const collection = db.get('restaurants')

    return collection.findOneAndUpdate({
      id: restaurant.id
    }, {
      $set: {
        title: restaurant.title,
        website: restaurant.website
      }
    }, {upsert: true})
  },
  getRestaurants: () => {
    const collection = db.get('restaurants')

    return collection.find({})
  }
}