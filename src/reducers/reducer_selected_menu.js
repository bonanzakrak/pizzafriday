export default function(state = null, action) {

  switch (action.type) {
    case('SELECT_MENU'):
      return action.payload
  }
  return state
}