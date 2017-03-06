import React from 'react'
import cookie from '../selectors/cookie'
import api from './api'

const _self = {
  login(cb) {
    api.auth((res) => {
      if (res.authenticated) {
        if (cb)
          return cb(true, res)
        this.onChange(true, res)
      } else {
        cookie.remove('JWToken')
        if (cb)
          return cb(false)
        this.onChange(false)
      }
    })
    return
  },
  loggedIn() {
    return !!cookie.load('JWToken')
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
    cookie.remove('JWToken')
    cb()
  }
}

module.exports = _self