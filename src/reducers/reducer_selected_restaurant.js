import _filter from 'lodash.filter'

export default function(state = null, action){
  switch(action.type){
    case('SELECT_RESTAURANT'):
      return action.payload
  }
  return state
}
