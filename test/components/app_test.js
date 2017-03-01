import React, {Component} from 'react'
import {renderComponent, expect, getToken, server, sinon} from '../test_helper'

import ConnectedApp, {App} from '../../src/components/app'
import {Provider} from 'react-redux';

import Nav from '../../src/components/nav'
import TestUtils from 'react-addons-test-utils'

describe('App', () => {
  let component
  let token = null

  before(function(done) {
    server
      .listen(1338, function() {
        getToken(function(error, serverToken) {
          //token = serverToken
          // global.document.cookie = "JWT=" + res.body
          done()
        })
      })
  });

  describe('not logged', () => {
    let componentDidMount

    beforeEach(() => {
      componentDidMount = sinon.spy(App.prototype, 'componentWillMount');
      component = renderComponent(App)
    })

    it('should display loading', () => {
      expect(component).to.exist
      expect(componentDidMount.calledOnce).to.be.true
      expect(component)
        .to
        .contain(
          <div>Loading</div>
        )
    })
  })


 /* describe('logged', () => {

    beforeEach(() => {
      component = renderComponent(App, {jwt: token})
    })

    it('should display loading', () => {
      expect(component).to.exist

    })

  })*/
  after(function() {
    //server.close();
  })
})
