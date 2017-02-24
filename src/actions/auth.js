import React from 'react'
import cookie from 'react-cookie'

const _self = {
  login(cb) {
    _self.request((res) => {
      if (res.authenticated) {
        if (cb)
          cb(true)
        this.onChange(true, res)
      } else {
        cookie.remove('jwt')
        if (cb)
          cb(false)
        this.onChange(false)
      }
    })
    return
  },
  loggedIn() {
    return !!cookie.load('jwt')
  },
  requireAuth(nextState, replace) {
    if (!_self.loggedIn()) {
      replace({
        pathname: '/',
        state: {
          nextPathname: nextState.location.pathname
        }
      })
    }
  },
  logout(cb) {
    cookie.remove('jwt')
    cb()
  },
  request(cb) {
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
      console.log(error)
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }
}

module.exports = _self