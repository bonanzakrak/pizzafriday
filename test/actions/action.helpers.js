import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'

module.exports = {
  notificationTest(action, expectedAction) {
    expect(action)
      .to.have.property('type')
      .and.equal(expectedAction.type)

    expect(action)
      .to.have.property('message')
      .and.equal(expectedAction.message)

    expect(action)
      .to.have.property('title')
      .and.equal(expectedAction.title)
    expect(action)
      .to.have.property('position')
      .and.equal(expectedAction.position)
    expect(action)
      .to.have.property('level')
      .and.equal(expectedAction.level)
    expect(action)
      .to.have.property('autoDismiss')
      .and.equal(expectedAction.autoDismiss)
    expect(action)
      .to.have.property('uid')
      .to.be.an('number')
  },
  simpleActionTest(action, expectedAction) {
    expect(action)
      .to.deep.equal(expectedAction)
  },
  mockStore(getState, expectedActions, tests, onLastAction) {
    let error
    const promisifyMiddleware = ({ dispatch, getState }) => next => action => {
      return new Promise((resolve) => resolve(next(action)))
        .catch((e) => {
          onLastAction(e)
          onLastAction = () => {}
        })
    }
    const middlewares = [promisifyMiddleware, thunk]

    if(!Array.isArray(expectedActions)) {
      throw new Error('expectedActions should be an array of expected actions.')
    }
    if(typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
      throw new Error('onLastAction should either be undefined or function.')
    }

    function mockStoreWithoutMiddleware() {
      return {
        getState() {
          return typeof getState === 'function' ?
            getState() :
            getState
        },

        dispatch(action) {
          const expectedAction = expectedActions.shift()
          const actionTest = tests.shift()
          actionTest(action, expectedAction)
          if(onLastAction && !expectedActions.length) {
            onLastAction()
          }
          return action
        }
      }
    }

    const mockStoreWithMiddleware = applyMiddleware(...middlewares)(mockStoreWithoutMiddleware)
    return mockStoreWithMiddleware()
  },
  getNotificationAction(text){
    return {
      type: 'RNS_SHOW_NOTIFICATION',
      title: 'Saved',
      message: text,
      position: 'br',
      autoDismiss: 3,
      uid: 1364767201200,
      level: 'info'
    }
  }

}