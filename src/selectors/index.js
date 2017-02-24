import _filter from 'lodash.filter'
import {createSelector} from 'reselect'

const getSelectedRestaurant = (state) => state.selectedRestaurant
const getSelectedMenu = (state) => state.selectedMenu
const getAvailableRestaurants = (state) => state.availableRestaurants

//const selectRestaurant = (props) => props.selectRestaurant

export const getSelRestaurant = createSelector([
  getSelectedRestaurant, getSelectedMenu, getAvailableRestaurants
], (selectedRestaurant, selectedMenu, availableRestaurants) => {
  let retValue = null
  if (!selectedRestaurant && !selectedMenu || availableRestaurants.length === 0)
    retValue = null

  else {
    if (selectedRestaurant && _filter(availableRestaurants, {id: selectedRestaurant.id}).length === 1)
      retValue = selectedRestaurant
    else if (selectedMenu && _filter(availableRestaurants, {id: selectedMenu.restaurant}).length === 1)
      retValue = _filter(availableRestaurants, {id: selectedMenu.restaurant})[0]
    else
      retValue = availableRestaurants[0]
  }
  /// selectRestaurant(retValue)
  return retValue
})

const getFullMenu = (state) => state.fullMenu

export const getMenu = createSelector([
  getSelRestaurant, getFullMenu
], (selectedRestaurant, fullMenu) => {
  if (!selectedRestaurant)
    return null
  return _filter(fullMenu, {restaurant: selectedRestaurant.id})
})

const getFullAddons = (state) => state.addons

export const getAddons = createSelector([
  getSelRestaurant, getFullAddons
], (selectedRestaurant, fullAddons) => {
  if (!selectedRestaurant)
    return null
  return _filter(fullAddons, {restaurant: selectedRestaurant.id})
})