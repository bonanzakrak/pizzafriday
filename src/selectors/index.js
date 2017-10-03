import _filter from 'lodash.filter'
import {createSelector} from 'reselect'

const getSelectedRestaurant = (state) => state.selectedRestaurant
const getSelectedMenu = (state) => state.selectedMenu
const getAvailableRestaurants = (state) => state.availableRestaurants

export const getSelRestaurant = createSelector([
  getSelectedRestaurant, getSelectedMenu, getAvailableRestaurants
], (selectedRestaurant, selectedMenu, availableRestaurants) => {

  let retValue = null
  if (!selectedRestaurant && !selectedMenu && availableRestaurants.length === 0)
    retValue = null
  else  if (!selectedRestaurant && !selectedMenu && availableRestaurants.length > 0)
   retValue = availableRestaurants[0]
  else {
    if (selectedRestaurant && _filter(availableRestaurants, {_id: selectedRestaurant._id}).length === 1)
      retValue = selectedRestaurant
    else if (selectedMenu && _filter(availableRestaurants, {_id: selectedMenu.restaurant}).length === 1)
      retValue = _filter(availableRestaurants, {_id: selectedMenu.restaurant})[0]
    else
      retValue = availableRestaurants[0]
  }

  return retValue
})