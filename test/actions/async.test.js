import React from 'react'
import nock from 'nock'

import sinon from 'sinon'

import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'

import {
  notificationTest,
  simpleActionTest,
  mockStore,
  getNotificationAction,
  getSampleAddon,
  getSampleMenu
} from './action.helpers'
describe('asyncronous action creators', () => {
  let clock
  before(function() {
    clock = sinon.useFakeTimers()
  })

  after(function() {
    clock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('update restaurant', () => {
    it('update redux with saving in db', (done) => {
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
        },
        getNotificationAction('Zapisano restauracje')
      ]

      const tests = [simpleActionTest, notificationTest]

      const save = true

      nock('http://' + process.env.HOST)
        .post(action.apiEndpoint)
        .reply(200, {body: restaurant})
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore
        .dispatch(actions.updateRestaurant(restaurant, save))
        .then(() => {})
        .catch((e) => done(e))
        // we need to wait for debouncer
        clock
        .tick(1200)

    })

    it('update redux store without saving in db', () => {
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
        .to
        .deep
        .equal(action)
    })
  })

  describe('update menu', () => {
    it('update redux with saving in db', (done) => {
      const menu = getSampleMenu('menu item 1', 123, 123, 123)

      const action = {
        type: types.SELECT_MENU,
        payload: menu,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        action,
        getNotificationAction('Wybrano danie główne: ' + menu.name)
      ]
      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.HOST)
        .post(action.apiEndpoint)
        .reply(200, {body: menu})
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore
        .dispatch(actions.selectMenu(menu, save))
        .then(() => {})
        .catch((e) => done(e))
        // we need to wait for debouncer
        clock
        .tick(1200)

    })

    it('update redux', () => {
      const menu = getSampleMenu('menu item 1', 123, 123, 123)

      const action = {
        type: types.SELECT_MENU,
        payload: menu,
        apiEndpoint: '/order'
      }

      const save = false
      expect(actions.selectMenu(menu, save))
        .to
        .deep
        .equal(action)
    })
  })

  describe('update addon', () => {
    it('update redux with saving in db', (done) => {
      const addon = getSampleAddon('addon item 1', 123, 123, [
        'a1', 'a2'
      ], 123)

      const action = {
        type: types.SELECT_ADDON,
        payload: addon,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        action,
        getNotificationAction('Wybrano dodatki: ' + addon.name)
      ]
      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.HOST)
        .post(action.apiEndpoint)
        .reply(200, {body: addon})
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore
        .dispatch(actions.selectAddon(addon, save))
        .then(() => {})
        .catch((e) => done(e))
        // we need to wait for debouncer
        clock
        .tick(1200)

    })

    it('update redux', () => {
      const addon = getSampleAddon('addon item 1', 123, 123, [
        'a1', 'a2'
      ], 123)

      const action = {
        type: types.SELECT_ADDON,
        payload: addon,
        apiEndpoint: '/order'
      }

      const save = false
      expect(actions.selectAddon(addon, save))
        .to
        .deep
        .equal(action)
    })
  })

  it('remove addon from db', (done) => {
    const action = {
      type: types.REMOVE_ADDON,
      apiEndpoint: '/order'
    }

    const expectedActions = [action, getNotificationAction('Usunięto dodatek')]

    const tests = [simpleActionTest, notificationTest]
    const save = true

    nock('http://' + process.env.HOST)
      .post(action.apiEndpoint)
      .reply(200, {body: ''})
    const myStore = mockStore({}, expectedActions, tests, done)
    myStore
      .dispatch(actions.removeAddon())
      .then(() => {})
      .catch((e) => done(e))
      // we need to wait for debouncer
      clock
      .tick(1200)

  })

  describe('update comment', () => {
    it('add comment to database', (done) => {
      const comment = 'some comment'
      const action = {
        type: types.ADD_COMMENT,
        payload: comment,
        apiEndpoint: '/order'
      }

      const expectedActions = [
        action,
        getNotificationAction('Dodano komentarz: ' + comment)
      ]

      const tests = [simpleActionTest, notificationTest]
      const save = true

      nock('http://' + process.env.HOST)
        .post(action.apiEndpoint)
        .reply(200, {body: ''})
      const myStore = mockStore({}, expectedActions, tests, done)
      myStore
        .dispatch(actions.addComment(comment, save))
        .then(() => {})
        .catch((e) => done(e))
        // we need to wait for debouncer
        clock
        .tick(1200)

    })
  })
})
