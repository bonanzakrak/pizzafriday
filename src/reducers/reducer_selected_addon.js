export default function(state = null, action) {
  switch (action.type) {
    case('SELECT_ADDON'):
      return action.payload
    case('REMOVE_ADDON'):
      return null
  }
  return state
}