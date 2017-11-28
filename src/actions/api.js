import React from 'react'
import cookie from '../selectors/cookie'
import debounce from 'lodash.debounce'
import _map from 'lodash.map'
let debouncers = {}
let baseURL = () => `http://${process.env.HOST}`

const _self = {
  auth(cb) {
    fetch(`${baseURL()}/auth/session`, {
      credentials: "same-origin",
      headers: {
        'Authorization': `JWT ${cookie.load('JWToken')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 401) {
        return {authenticated: false}
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      cb(response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation0: ' + error.message)
    })
  },
  saveRestaurants(action, cb) {
    fetch(`${baseURL()}/restaurant/active`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(_map(action, '_id')),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('JWToken')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      //cb(response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation1: ' + error.message)
    })
  },
  saveSelection(action, cb) {
    const func = (action, cb) => {
      return _self.saveSelectionFull(action, cb)
    }
    return _self.getDebouncer(action.type, 1000, func)(action, cb)
  },
  getDebouncer(key, wait, func) {
    let debouncer

    if (debouncers.hasOwnProperty(key)) {
      debouncer = debouncers[key]
    } else {
      debouncer = debounce(func, wait)
      debouncers[key] = debouncer
    }

    return debouncer
  },
  saveSelectionFull(action, cb) {
    return fetch(`${baseURL()}${action.apiEndpoint}`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(action),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('JWToken')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      cb(response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation2: ' + error.message)
      return error
    })
  },
  getOrders(endpoint, callback) {
    return fetch(`${baseURL()}${endpoint}`, {credentials: "same-origin"}).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((orders) => {

      callback(orders)
    }).catch((error) => {

      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  },
  getUsers(callback) {
    return fetch(`${baseURL()}/users`, {credentials: "same-origin"}).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((orders) => {
      callback(orders)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  },
  getUser(user, callback) {
    return fetch(`${baseURL()}/users/${user}`, {credentials: "same-origin"}).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((orders) => {
      callback(orders)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  },
  setUserProvilages(id, admin, cb) {
    const func = (id, admin, cb) => {
      return _self.setUserProvilagesApi(id, admin, cb)
    }
    return _self.getDebouncer('setUserProvilages' + id, 1000, func)(id, admin, cb)

  },
  setUserProvilagesApi(id, admin, cb){
    return fetch(`${baseURL()}/users`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify({user:id, admin:admin}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('JWToken')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      cb(true,response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation2: ' + error.message)
      return error
    })

  }
}

module.exports = _self
