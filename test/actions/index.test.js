import React from 'react'


import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'

import {
  notificationTest
} from './action.helpers'

describe('should return action creators', () => {
  it('to display notification', () => {
    const text = 'notification text'
    const expectedAction = {
      type: 'RNS_SHOW_NOTIFICATION',
      title: 'Saved',
      message: 'notification text',
      position: 'br',
      autoDismiss: 3,
      level: 'info',
      uid: 123456789
    }
    const action = actions.getNotification(text)

    notificationTest(action, expectedAction)
  })

  it('to update user', () => {
    const user = {
      name: 'test',
      _id: 123
    }
    const expectedAction = {
      type: types.USER_UPDATED,
      payload: user
    }

    expect(actions.updateUser(user))
      .to.deep.equal(expectedAction)
  })

  describe('select restaurant action creator', () => {
    it('to select restaurant when is not disabled', () => {
      const restaurant = {
        title: 'test',
        website: 'test website',
        _id: 123
      }
      const isDisabled = false

      const expectedAction = {
        type: types.SELECT_RESTAURANT,
        payload: restaurant
      }
      expect(actions.selectRestaurant(restaurant, isDisabled))
        .to.deep.equal(expectedAction)

    })
    it('to blank when is disabled', () => {
      const restaurant = {
        title: 'test',
        website: 'test website',
        _id: 123
      }
      const isDisabled = true

      const expectedAction = {
        type: types.BLANK
      }
      expect(actions.selectRestaurant(restaurant, isDisabled))
        .to.deep.equal(expectedAction)

    })
  })

  it('for active restaurant', () => {
    const restaurant = {
      title: 'test',
      website: 'test website',
      _id: 123
    }
    const isDisabled = true

    const expectedAction = {
      type: types.SET_RESTAURANTS,
      payload: restaurant,
      save: true
    }
    expect(actions.setAvailableRestaurants(restaurant, isDisabled))
      .to.deep.equal(expectedAction)
  })

  it('for grouped orders', () => {
    const orders = [{}, {}]
    const expectedAction = {
      type: 'GROUPED_ORDERS',
      payload: orders
    }
    expect(actions.setGroupedOrders(orders))
      .to.deep.equal(expectedAction)
  })


  it('for grouped orders', () => {
    const orders = [{}, {}]
    const expectedAction = {
      type: 'ALL_ORDERS',
      payload: orders
    }

    expect(actions.setOrders(orders))
      .to.deep.equal(expectedAction)
  })

  it('for menu from api', () => {
    // shoult pass by everything what we input
    const menu = [{
      name: 'test',
      price: 123,
      restaurant: 123, //ObjectId
      _id: 123
    }, {
      name: 'test 2',
      price: 321,
      restaurant: 321, //ObjectId
      _id: 321
    }]

    const expectedAction = {
      type: types.SET_MENU,
      payload: menu
    }

    expect(actions.setMenu(menu))
      .to.deep.equal(expectedAction)
  })
  it('for addons from api', () => {
    const addons = [{
      name: 'test',
      price: 123,
      restaurant: 123, //ObjectId
      items: [
      't1', 't2'
    ],
      _id: 123
    }, {
      name: 'test 2',
      price: 321,
      restaurant: 321, //ObjectId
      items: [
      't2', 't3'
    ],
      _id: 321
    }]
    const expectedAction = {
      type: types.SET_ADDONS,
      payload: addons
    }

    expect(actions.setAddons(addons))
      .to.deep.equal(expectedAction)
  })


})