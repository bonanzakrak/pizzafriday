import _filter from 'lodash.filter'
import _remove from 'lodash.remove'
import _unionBy from 'lodash.unionby'
import _map from 'lodash.map'
import cookie from 'react-cookie'
import api from '../actions/api'
export default function(state = [], action) {
  switch (action.type) {
    case('SET_RESTAURANTS'):
      {
        let array = state.slice()
        if (_filter(state, {id: action.payload.id}).length > 0)
          _remove(array, {id: action.payload.id})
        else if (Array.isArray(action.payload))
          array = _unionBy(action.payload, array)
        else
          array.push(action.payload)

        if (action.save)
          api.saveRestaurants(array)

        return array
      }
  }
  return state
}