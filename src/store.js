import DevTools from './containers/DevTools'
import reducers from './reducers'
import { createStore, applyMiddleware,compose } from 'redux'

import thunk from 'redux-thunk'

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk),//debounceMiddleware
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)


export default createStore(reducers, enhancer)