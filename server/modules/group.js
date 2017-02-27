const _ = require('lodash')
module.exports = {
  parseMenu: (results) => {
    return _(results)
      .groupBy('menu.name')
      .map(function(value, key) {
        if (key !== 'undefined') {
          const customers = _.map(value, function(object) {
            return _.pick(object, ['user', 'comment'])
          })
          const restaurant = _.uniqBy(value, 'menu.restaurant')[0]['menu']['restaurant']
          const altName = _.uniqBy(value, 'menu.altName')[0]['menu']['altName']
          const price = _.uniqBy(value, 'menu.price')[0]['menu']['price']
          return {
            name: key,
            altName,
            restaurant,
            count: value.length,
            customers,
            price,
            type: 1
          }
        }
        return null
      })
      .remove(null)
      .valueOf()
  },
  parseAddons: (results) => {
    let addons = _.map(results, function(value) {
      let items = []
      if (value.addon)
        _.map(value.addon.items, function(item, index) {

          let retValue = _.pick(_.clone(value), ['user', 'addon.restaurant'])
          retValue.name = item
          retValue.price = index === 0
            ? value.addon.price
            : 0
          items.push(retValue)
        })
      return items
    }).valueOf()

    const merged = []
      .concat
      .apply([], addons)

    return _(merged)
      .groupBy('name')
      .map(function(value, key) {
        const customers = _.map(value, function(object) {
          return _.pick(object, ['user', 'comment'])
        })
        const restaurant = _.uniqBy(value, 'addon.restaurant')[0]['addon']['restaurant']
        const price = _.uniqBy(value, 'price')[0]['price']
        const names = key.split(' / ')

        return {
          name: names[0],
          altName: names[1],
          restaurant,
          count: value.length,
          customers,
          price,
          type: 2
        }
      })
      .valueOf()
  },
  concatMenu: (results) => {
    return []
      .concat
      .apply(module.exports.parseMenu(results), module.exports.parseAddons(results))
  },
  groupByRestaurant: (merged) => {
    return _(merged).groupBy('restaurant')
  },
  reduceRestaurants: (grouped) => {
    return grouped.map((value, restaurant) => {
      let sum = 0
      const sorted = _.sortBy(value, function(order) {
        sum += order.price * order.count
        return [order.type, order.name]
      })

      return {
        restaurant,
        sorted,
        total: sum
      }
    }).valueOf()
  },
  activeRestaurantsSort: (scope, results) => {
    if (results[0])
      results[0].restaurants = _.sortBy(results[0].restaurants, ['id'])
    scope.activeRestaurants = results[0]
      ? results[0]
      : {
        id: 'active',
        restaurants: []
      }
    return
  },
  usersOrders: (scope, results) => {
    const menu = results[0]

    scope.food = {}
    if (menu) {
      if (menu.menu)
        scope.food.SELECT_MENU = menu.menu
      if (menu.addon)
        scope.food.SELECT_ADDON = menu.addon
      if (menu.comment)
        scope.food.ADD_COMMENT = menu.comment
    }
    return scope
  },
  bindRestaurants:(scope, results) => {
    scope.restaurants = results
    return
  }
}