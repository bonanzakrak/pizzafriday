import React from 'react'
import cookie from '../selectors/cookie'
import debounce from 'lodash.debounce'
import _map from 'lodash.map'
let debouncers = {}

const _self = {

  auth(cb) {
    fetch('http://' + process.env.host + '/auth/session', {
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
    fetch('http://' + process.env.host + '/restaurant/active', {
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
    const func = (action, cb) => {return _self.saveSelectionFull(action, cb)}
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
     return fetch('http://' + process.env.host + action.apiEndpoint, {
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
  }
}

module.exports = _self