import React from 'react'
import nock from 'nock'

import thunk from 'redux-thunk'
import sinon from 'sinon'
import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'
import {applyMiddleware} from 'redux'

describe('Action creators - async', () => {
  let clock
  before(function() {
    clock = sinon.useFakeTimers()
  })

  after(function() {
    clock.restore();
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('update restaurant action creator', () => {

    it('should send data to database', (done) => {
      const restaurant = {
        title: 'test',
        website: 'test website',
        _id: 123
      }

      const action = {
        type: types.UPDATE_RESTAURANT,
        payload: restaurant,
        apiEndpoint: '/restaurant'
      }

      const expectedActions = [
        {
          type: 'UPDATE_RESTAURANT',
          payload: {
            body: restaurant
          },
          apiEndpoint: '/restaurant'
        }, {
          type: 'RNS_SHOW_NOTIFICATION',
          title: 'Saved',
          message: 'Zapisano restauracje',
          position: 'br',
          autoDismiss: 3,
          uid: 1364767201200,
          level: 'info'
        }
      ]

      const save = true

      nock('http://' + process.env.host).post(action.apiEndpoint).reply(200, {body: restaurant})
      const myStore = mockStore({}, expectedActions, done)
      myStore.dispatch(actions.updateRestaurant(restaurant, save)).then(() => {}).catch((e) => done(e))
      // we need to wait for debouncer
      clock.tick(1200)

    })

    it('should update redux store without saving', () => {
      const restaurant = {
        title: 'test',
        website: 'test website',
        _id: 123
      }

      const action = {
        type: types.UPDATE_RESTAURANT,
        payload: restaurant,
        apiEndpoint: '/restaurant'
      }

      const save = false
      expect(actions.updateRestaurant(restaurant, save)).to.deep.equal(action)
    })
  })

  describe('update menu action creator', () => {
    it('should send menu to database', (done) => {
      console.log('send menu')
      const menu = {
        name: 'test',
        price: 123,
        restaurant: 123, //ObjectId
        _id: 123
      }

      const action = {
        type: 'SELECT_MENU',
        payload: menu,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        {
          type: 'SELECT_MENU',
          payload: {
            name: 'test',
            price: 123,
            restaurant: 123,
            _id: 123
          },
          apiEndpoint: '/order'
        }, {
          type: 'RNS_SHOW_NOTIFICATION',
          title: 'Saved',
          message: 'Wybrano danie główne: ' + menu.name,
          position: 'br',
          autoDismiss: 3,
          uid: 1364767201200,
          level: 'info'
        }
      ]

      const save = true

      nock('http://' + process.env.host).post(action.apiEndpoint).reply(200, {body: menu})
      const myStore = mockStore({}, expectedActions, done)
      myStore.dispatch(actions.selectMenu(menu, save)).then(() => {}).catch((e) => done(e))
      // we need to wait for debouncer
      clock.tick(1200)

    })
  })
})

function mockStore(getState, expectedActions, onLastAction) {
  const promisifyMiddleware = ({dispatch, getState}) => next => action => {
    return new Promise((resolve) => resolve(next(action))).catch((e) => {
      onLastAction(e)
      onLastAction = () => {}
    })
  }
  const middlewares = [promisifyMiddleware, thunk]

  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function'
          ? getState()
          : getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.be.an('object')
        expect(action).to.have.all.keys(Object.keys(expectedAction))
        if (onLastAction && !expectedActions.length) {
          onLastAction();
        }
        return action;
      }
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(...middlewares)(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}