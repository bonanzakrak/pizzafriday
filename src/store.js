import DevTools from './containers/DevTools'
import reducers from './reducers'
import { createStore, applyMiddleware,compose } from 'redux'
import {debounceMiddleware} from 'redux-middleware-debounce'
import thunk from 'redux-thunk'

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(debounceMiddleware,thunk),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)


export default createStore(reducers, enhancer)