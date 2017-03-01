import React, {Component} from 'react'
import ConnectedApp, {App} from '../../src/components/app'

describe('App', () => {
  let component
  let token = null

  before(function(done) {
    server
      .listen(1338, function() {
        getToken().then(function(serverToken) {
          // global.document.cookie = "JWT=" + res.body
          done()
        }).catch(function(error){})
      })
  })

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

})
