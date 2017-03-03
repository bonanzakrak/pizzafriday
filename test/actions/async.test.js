import React from 'react'
import nock from 'nock'


import sinon from 'sinon'

import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'

import { notificationTest, simpleActionTest, mockStore } from './action.helpers'
describe('Action creators - async', () => {
  let clock
  before(function () {
    clock = sinon.useFakeTimers()
  })

  after(function () {
    clock.restore()
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

      const tests = [simpleActionTest, notificationTest]

      const save = true

      nock('http://' + process.env.host)
        .post(action.apiEndpoint)
        .reply(200, { body: restaurant })
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore.dispatch(actions.updateRestaurant(restaurant, save))
        .then(() => {})
        .catch((e) => done(e))
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
      expect(actions.updateRestaurant(restaurant, save))
        .to.deep.equal(action)
    })
  })

  describe('update menu action creator', () => {
    it('should send menu to database', (done) => {
      const menu = {
        name: 'test',
        price: 123,
        restaurant: 123, //ObjectId
        _id: 123
      }

      const action = {
        type: types.SELECT_MENU,
        payload: menu,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        action, {
          type: 'RNS_SHOW_NOTIFICATION',
          title: 'Saved',
          message: 'Wybrano danie główne: ' + menu.name,
          position: 'br',
          autoDismiss: 3,
          uid: 1364767201200,
          level: 'info'
        }
      ]
      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.host)
        .post(action.apiEndpoint)
        .reply(200, { body: menu })
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore.dispatch(actions.selectMenu(menu, save))
        .then(() => {})
        .catch((e) => done(e))
      // we need to wait for debouncer
      clock.tick(1200)

    })

    it('should update redux store without saving', () => {
      const menu = {
        name: 'test',
        price: 123,
        restaurant: 123, //ObjectId
        _id: 123
      }

      const action = {
        type: types.SELECT_MENU,
        payload: menu,
        apiEndpoint: '/order'
      }

      const save = false
      expect(actions.selectMenu(menu, save))
        .to.deep.equal(action)
    })
  })

  describe('update addon action creator', () => {
    it('should send addon to database', (done) => {
      const addon = {
        name: 'test',
        price: 123,
        restaurant: 123, //ObjectId
        items: [
          't1', 't2'
        ],
        _id: 123
      }

      const action = {
        type: types.SELECT_ADDON,
        payload: addon,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        action, {
          type: 'RNS_SHOW_NOTIFICATION',
          title: 'Saved',
          message: 'Wybrano dodatki: ' + addon.name,
          position: 'br',
          autoDismiss: 3,
          uid: 1364767201200,
          level: 'info'
        }
      ]
      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.host)
        .post(action.apiEndpoint)
        .reply(200, { body: addon })
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore.dispatch(actions.selectAddon(addon, save))
        .then(() => {})
        .catch((e) => done(e))
      // we need to wait for debouncer
      clock.tick(1200)

    })

    it('should update redux store without saving', () => {
      const addon = {
        name: 'test',
        price: 123,
        restaurant: 123, //ObjectId
        items: [
          't1', 't2'
        ],
        _id: 123
      }

      const action = {
        type: types.SELECT_ADDON,
        payload: addon,
        apiEndpoint: '/order'
      }

      const save = false
      expect(actions.selectAddon(addon, save))
        .to.deep.equal(action)
    })
  })

  it('should remove addon from database', (done) => {
    const action = {
      type: types.REMOVE_ADDON,
      apiEndpoint: '/order'
    }

    const expectedActions = [
      action, {
        type: 'RNS_SHOW_NOTIFICATION',
        title: 'Saved',
        message: 'Usunięto dodatek',
        position: 'br',
        autoDismiss: 3,
        uid: 1364767201200,
        level: 'info'
      }
    ]

    const tests = [simpleActionTest, notificationTest]
    const save = true

    nock('http://' + process.env.host)
      .post(action.apiEndpoint)
      .reply(200, { body: '' })
    const myStore = mockStore({}, expectedActions, tests, done)
    myStore.dispatch(actions.removeAddon())
      .then(() => {})
      .catch((e) => done(e))
    // we need to wait for debouncer
    clock.tick(1200)

  })

  describe('update comment action creator', () => {
    it('should add comment to database', (done) => {
      const comment = 'some comment'
      const action = {
        type: types.ADD_COMMENT,
        payload: comment,
        apiEndpoint: '/order'
      }

      const expectedActions = [
      action, {
          type: 'RNS_SHOW_NOTIFICATION',
          title: 'Saved',
          message: 'Dodano komentarz: ' + comment,
          position: 'br',
          autoDismiss: 3,
          uid: 1364767201200,
          level: 'info'
      }
    ]

      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.host)
        .post(action.apiEndpoint)
        .reply(200, { body: '' })
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore.dispatch(actions.addComment(comment, save))
        .then(() => {})
        .catch((e) => done(e))
      // we need to wait for debouncer
      clock.tick(1200)

    })
  })



})