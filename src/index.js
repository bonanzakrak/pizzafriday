import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import App from './components/app'
import reducers from './reducers'
import {debounceMiddleware} from 'redux-middleware-debounce'
import DevTools from './containers/DevTools'

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(debounceMiddleware,thunk),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)

ReactDOM.render(
  <Provider store={createStore(reducers, enhancer)}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
  , document.querySelector('.container'))
