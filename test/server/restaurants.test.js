let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

import setup from '../setup'

chai.use(chaiHttp)

describe('Get restaurant data from API', function() {
  let token = null
  let menu = []
  before(function(done) {
    getToken().then(function(res) {
      token = res.body
      done()
    }).catch(function(error) {})
  });

  it('Should block request without JWT', function(done) {
    chai.request(process.env.HOST).get('/restaurant').end((err, res) => {
      res.should.have.status(401)

      done()
    })
  })

  it('Should block request with invalid JWT', function(done) {
    chai.request(process.env.HOST).get('/restaurant').set('Authorization', 'JWT invalidToken').end((err, res) => {
      res.should.have.status(401)

      done()
    })
  })

  describe('Should allow to get with authentication', function() {

    it('returning all restaurants', function(done) {
      chai.request(process.env.HOST).get('/restaurant').set('Authorization', 'JWT ' + token).end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.be.lengthOf(setup.restaurants.length)

        done()
      })
    })

  })
})