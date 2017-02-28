export default function(state = [], action) {
  switch (action.type) {
    case('SET_MENU'):
      return action.payload
  }
  return state
}