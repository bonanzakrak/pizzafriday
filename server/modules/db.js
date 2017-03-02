const moment = require('moment')
const lodash = require('lodash')

const models = require('../models')

module.exports = {
  upsertUser: (user, cb) => {
    //this is from passport - required CB
    models
      .User
      .findOneAndUpdate({
        id: user.id
      }, user, {upsert: true})
      .then((result) => {
        cb(null, result.id)
      })
      .catch((error) => cb(error, null))
  },
  getUser: (payload, cb) => {
    //this is from passport - required CB
    models
      .User
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
    let update

    switch (action.type) {
      case('SELECT_MENU'):
        {
          update = {
            $set: {
              menu: action.payload
            }
          }
          break
        }
      case('SELECT_ADDON'):
        {
          update = {
            $set: {
              addon: action.payload
            }
          }
          break
        }
      case('ADD_COMMENT'):
        {
          update = {
            $set: {
              comment: action.payload
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

    return models
      .Order
      .findOneAndUpdate({
        user: user,
        date: moment()
          .startOf('day')
          .toDate()
      }, update, {upsert: true})
  },
  getUserOrders: (user, scope) => {
    if (scope.authenticated) {

      return models
        .Order
        .find({
          user: user,
          date: moment()
            .startOf('day')
            .toDate()
        })
        .populate('menu')
        .populate('addon')
        .populate('user')
    }
    return []
  },
  getOrders: () => {
    return models
      .Order
      .find({
        date: moment()
          .startOf('day')
          .toDate()
      })
      .populate('menu')
      .populate('addon')
      .populate('user')
  },
  setActiveRestaurants: (restaurants) => {
    return models
      .ActiveRestaurant
      .findOneAndUpdate({
        id: 'active'
      }, {
        $set: {
          restaurants
        }
      }, {upsert: true})
  },
  getActiveRestaurants: () => {
    return models
      .ActiveRestaurant
      .find({})
      .populate('restaurants')
  },
  setRestaurant: (data) => {
    const restaurant = data.payload

    return models
      .Restaurant
      .findOneAndUpdate({
        id: restaurant.id
      }, {
        $set: {
          title: restaurant.title,
          website: restaurant.website
        }
      }, {upsert: true})
  },
  getRestaurants: () => {
    return models
      .Restaurant
      .find({})
  }
}