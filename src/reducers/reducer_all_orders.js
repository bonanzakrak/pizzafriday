export default function(state = [], action) {
  switch (action.type) {
    case('ALL_ORDERS'):
      return action.payload
  }
  return state
}