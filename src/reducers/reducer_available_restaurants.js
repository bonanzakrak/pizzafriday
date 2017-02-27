import _filter from 'lodash.filter'
import _remove from 'lodash.remove'
import _unionBy from 'lodash.unionby'
import _map from 'lodash.map'
import cookie from 'react-cookie'

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
          saveRestaurants(array)

        return array
      }
  }
  return state
}

const saveRestaurants = (action, cb) => {
  fetch('/restaurant/active', {
    credentials: "same-origin",
    method: 'POST',
    body: JSON.stringify(_map(action,'_id')),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${cookie.load('jwt')}`
    }
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Network response was not ok.')
  }).then((response) => {
    //cb(response)
  }).catch((error) => {
    console.log('There has been a problem with your fetch operation: ' + error.message)
  })
}