export default function(state = {}, action){
  switch(action.type){
    case('USER_UPDATED'):
    return action.payload
  }
  return state
}
