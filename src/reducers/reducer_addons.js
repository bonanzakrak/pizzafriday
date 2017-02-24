import filter from 'lodash.filter'
import addonsMoa from './addons/moa.json'
import addonsMammamia from './addons/mammamia.json'
import addonsTata from './addons/tata.json'
export default function(state = null, action) {
  /*switch (action.type) {
    case('SELECT_RESTAURANT'):
      {
        return filter(addons, {restaurant: action.payload.id})
      }
  }*/
  return addons
}

const addons = addonsMoa.concat(addonsMammamia).concat(addonsTata)





