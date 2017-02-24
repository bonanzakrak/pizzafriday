import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
require('isomorphic-fetch')

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, storeState = {},state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, storeState)} >
      <ComponentClass {...props} {...state} className="stateComponent"/>
    </Provider>
  );

  return componentInstance;
}

function jQuery(componentInstance){
  return $(ReactDOM.findDOMNode(componentInstance))
}


$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect,jQuery};
