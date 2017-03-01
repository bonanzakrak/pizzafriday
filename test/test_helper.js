process.env.host = '127.0.0.1:1338'
process.env.PORT = '1337'
process.env.ENV_SECRET = 'test_secret'
process.env.NODE_ENV = "DEV"
//import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';

import chai, {expect} from 'chai';
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server/app');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
import {Provider} from 'react-redux';

import enzyme, {mount, shallow} from 'enzyme'
import chaiEnzyme from 'chai-enzyme';

import {createStore} from 'redux';
import reducers from '../src/reducers';

require('isomorphic-fetch')

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

chai.use(chaiEnzyme())
chai.use(chaiHttp)
chai.use(sinonChai);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance = shallow(<ComponentClass {...props}/>)
  /*
  <Provider store={createStore(reducers, state)}>
    <ComponentClass {...props}/>
  </Provider>
   */

  return componentInstance
}

let user = {
  "id": "TESTUSER",
  "image_72": "https://avatars.slack-edge.com/2016-01-20/18939109478_93f9999bc9919b5aa816_72.jpg",
  "image_48": "https://avatars.slack-edge.com/2016-01-20/18939109478_93f9999bc9919b5aa816_48.jpg",
  "email": "test@webspirit.ie",
  "name": "Test Test"
}

function getToken(callback) {
  chai
    .request(process.env.host)
    .post('/auth/user')
    .send(user)
    .end(function(err, res) {
     // global.document.cookie = "JWT=" + res.body
      callback(err, res.body)
    });
}

export {renderComponent, expect, getToken, server, sinon}
