export default function(state = '', action) {
  switch (action.type) {
    case('ADD_COMMENT'):
      return action.payload
  }
  return state
}