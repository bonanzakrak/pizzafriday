import React from 'react'
import cookie from 'react-cookie'
import debounce from 'lodash.debounce'
let debouncers = {}

const _self = {

  auth(cb) {
    fetch('/auth/session', {
      credentials: "same-origin",
      headers: {
        'Authorization': `JWT ${cookie.load('jwt')}`
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
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  },
  saveRestaurants(action, cb) {
    fetch('/restaurant/active', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(_map(action, '_id')),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('jwt')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      //cb(response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  },
  saveSelection(action, cb) {
    const func = (action, cb) => _self.saveSelectionFull(action, cb)
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
    fetch(action.apiEndpoint, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(action),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('jwt')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      cb(response)
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }

}

module.exports = _self