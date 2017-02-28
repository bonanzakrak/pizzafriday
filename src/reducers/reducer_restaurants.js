export default function(state = [], action) {
  switch (action.type) {
    case('UPDATE_RESTAURANT'):{
      return action.payload
    }
  }
  return state
}