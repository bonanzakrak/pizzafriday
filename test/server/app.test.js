/*let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var server = require('../../server/app');



chai.use(chaiHttp);*/

import {chai, should, server, getToken} from '../test_helper';

describe('My API tests', function() {

  let token = null;

  before(function(done) {
    getToken(function(error, serverToken) {
      //token = serverToken
      done()
    })
  });

});