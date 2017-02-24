import filter from 'lodash.filter'
import menuMoa from './menu/moa.json'
import menuHaiku from './menu/haiku.json'
import menuMammamia from './menu/mammamia.json'
import menuTata from './menu/tata.json'
export default function(state = null, action) {
  /*switch (action.type) {
    case('SELECT_RESTAURANT'):
      return filter(menu, {restaurant: action.payload.id})
  }*/
  return menu
}


const menu = menuMoa.concat(menuHaiku).concat(menuMammamia).concat(menuTata)
