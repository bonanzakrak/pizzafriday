import React from 'react'


import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'


describe('Action creators', () => {
  it('should create an action to display notification', () => {
    const text = 'notification text'
    const expectedAction = {
      type: 'RNS_SHOW_NOTIFICATION',
      title: 'Saved',
      message: 'notification text',
      position: 'br',
      autoDismiss: 3,
      level: 'info'
    }
    const action = actions.getNotification(text)

    expect(action).to.have.property('type').and.equal('RNS_SHOW_NOTIFICATION')
    expect(action).to.have.property('message').and.equal(text)
    expect(action).to.have.property('title').and.equal('Saved')
    expect(action).to.have.property('position').and.equal('br')
    expect(action).to.have.property('level').and.equal('info')
    expect(action).to.have.property('autoDismiss').and.equal(3)
    expect(action).to.have.property('uid').to.be.an('number');
  })

  it('should create an action to update user', () => {
    const user = {
      name: 'test',
      _id: 123
    }
    const expectedAction = {
      type: types.USER_UPDATED,
      payload: user
    }

    expect(actions.updateUser(user)).to.deep.equal(expectedAction)
  })

  describe('select restaurant action creator', () => {
    it('should create an action to select restaurant when is not disabled', () => {
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
      expect(actions.selectRestaurant(restaurant, isDisabled)).to.deep.equal(expectedAction)

    })
    it('should create an action to blank when is disabled', () => {
      const restaurant = {
        title: 'test',
        website: 'test website',
        _id: 123
      }
      const isDisabled = true

      const expectedAction = {
        type: types.BLANK
      }
      expect(actions.selectRestaurant(restaurant, isDisabled)).to.deep.equal(expectedAction)

    })
  })





  

})

