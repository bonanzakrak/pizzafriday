let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

import setup from '../setup'

chai.use(chaiHttp)

describe('Get menu data from API', function() {
  let token = null
  let menu = []
  before(function(done) {
    getToken().then(function(res) {
      token = res.body
      done()
    }).catch(function(error) {})
  });

  it('Should block request without JWT', function(done) {
    chai.request(process.env.host).get('/menu').end((err, res) => {
      res.should.have.status(401)

      done()
    })
  })

  it('Should block request with invalid JWT', function(done) {
    chai.request(process.env.host).get('/menu').set('Authorization', 'JWT invalidToken').end((err, res) => {
      res.should.have.status(401)

      done()
    })
  })

  describe('Should allow to get menu with authentication', function() {
    let menu = []
    before(function(done) {
      models.Menu.find({}).then(function(data) {
        menu = data
        done()
      }).catch(function(error) {})

    })

    it('returning all elements', function(done) {
      chai.request(process.env.host).get('/menu').set('Authorization', 'JWT ' + token).end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.be.lengthOf(menu.length)

        done()
      })
    })

    setup.restaurants.forEach(function(restaurant) {
      it('returning menu for restaurant ' + restaurant.title, function(done) {
        chai.request(process.env.host).get('/menu/' + restaurant._id).set('Authorization', 'JWT ' + token).end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.be.lengthOf(0) // will be changed when created menu in setup

          done()
        })
      })
    })

    it('for non existing restaurant', function(done) {
      chai.request(process.env.host).get('/menu/' + mongoose.Types.ObjectId()).set('Authorization', 'JWT ' + token).end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.be.lengthOf(0)

        done()
      })
    })

    it('status 500 for invalid restaurant id', function(done) {
      chai.request(process.env.host).get('/menu/undefined').set('Authorization', 'JWT ' + token).end((err, res) => {
        res.should.have.status(500)
        res.text.should.have.string('restaurant is not valid ObjectId')

        done()
      })
    })

  })
})