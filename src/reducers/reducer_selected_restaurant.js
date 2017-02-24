import _filter from 'lodash.filter'


export default function(state = null, action){

  switch(action.type){
    case('SELECT_RESTAURANT'):
      return action.payload
    /*case('SET_RESTAURANTS'):{
      if (state && action.payload.title == state.title){
        if(action.checked){
          return null
        }
        else{
          return action.payload
        }
      }
      else if(!state && action && action.save && !action.checked)
        return action.payload
    }*/
  }
  return state
}
