let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

var server = require('../../server/app');

chai.use(chaiHttp);

describe('Menu routing', function() {

  let token = null;

  before(function(done) {
    let user = {
      "id": "TESTUSER",
      "image_72": "https://avatars.slack-edge.com/2016-01-20/18939109478_93f9999bc9919b5aa816_72.jpg",
      "image_48": "https://avatars.slack-edge.com/2016-01-20/18939109478_93f9999bc9919b5aa816_48.jpg",
      "email": "test@webspirit.ie",
      "name": "Test Test"
    }

    chai
      .request(server)
      .post('/auth/user')
      .send(user)
      .end(function(err, res) {
        token = res.body; // Or something
        done();
      });
  });

  it('Should block request without authentication', function(done) {
    chai
      .request(server)
      .get('/menu')

      .end((err, res) => {
        res
          .should
          .have
          .status(401)

        done()
      })
  });

  it('Should allow to get menu with authentication', function(done) {
    chai
      .request(server)
      .get('/menu')
      .set('Authorization', 'JWT ' + token)
      .end((err, res) => {
        res
          .should
          .have
          .status(200)

        res
          .body
          .should
          .be
          .a('array')

        done()
      })
  });
});