export default function(state = [], action) {
  switch (action.type) {
    case('GROUPED_ORDERS'):
      return action.payload
  }
  return state
}