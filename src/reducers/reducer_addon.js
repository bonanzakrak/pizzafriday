export default function(state = [], action) {
  switch (action.type) {
    case('SET_ADDONS'):
      return action.payload
  }
  return state
}