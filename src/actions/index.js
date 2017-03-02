import Notifications from 'react-notification-system-redux'
import api from './api'

const getNotification = (text) => {
  let notificationOpts = {
    title: 'Saved',
    message: text,
    position: 'br',
    autoDismiss: 3
  }
  return Notifications.info(notificationOpts)
}

const updateUser = (user) => {
  return {type: 'USER_UPDATED', payload: user}
}

const selectRestaurant = (restaurant, isDisabled) => {
  if (!isDisabled)
    return {type: 'SELECT_RESTAURANT', payload: restaurant}
  else
    return {type: 'BLANK'}
  }

const updateRestaurant = (restaurant, save = true) => {
  const action = {
    type: 'UPDATE_RESTAURANT',
    payload: restaurant,
    apiEndpoint: '/restaurant'
  }
  if (!save)
    return action
  else
    return function(dispatch, getState) {
      return api.saveSelection(action, (restaurants) => {
        // get data from response (new id's)
        action.payload = restaurants
        dispatch(action)
        dispatch(getNotification('Zapisano restauracje'))
      })
    }
  }

const selectMenu = (menu, save = true) => {
  const action = {
    type: 'SELECT_MENU',
    payload: menu,
    apiEndpoint: '/order'
  }

  return function(dispatch, getState) {
    dispatch(action)
    if (save) {
      api.saveSelection(action, () => {
        dispatch(getNotification('Wybrano danie główne: ' + menu.name))
      })
    }
  }
}

const selectAddon = (addon, save = true) => {
  const action = {
    type: 'SELECT_ADDON',
    payload: addon,
    apiEndpoint: '/order'
  }
  return function(dispatch, getState) {
    dispatch(action)
    if (save) {
      api.saveSelection(action, () => {
        dispatch(getNotification('Wybrano dodatki: ' + addon.name))
      })
    }
  }
}

const removeAddon = () => {
  const action = {
    type: 'REMOVE_ADDON',
    apiEndpoint: '/order'
  }

  return function(dispatch, getState) {
    dispatch(action)
    api.saveSelection(action, () => {
      dispatch(getNotification('Usunięto dodatek'))
    })
  }
}

const addComment = (comment, save = true) => {
  const action = {
    type: 'ADD_COMMENT',
    payload: comment,
    apiEndpoint: '/order'
  }

  return function(dispatch, getState) {
    dispatch(action)
    if (save) {
      api.saveSelection(action, () => {
        dispatch(getNotification('Dodano komentarz: ' + comment))
      })
    }
  }
}

const setAvailableRestaurants = (restaurant, save = true, checked) => {
  const action = {
    type: 'SET_RESTAURANTS',
    payload: restaurant,
    save: save,
    checked: checked
  }
  return action
}

const setGroupedOrders = (orders) => {
  const action = {
    type: 'GROUPED_ORDERS',
    payload: orders
  }
  return action
}

const setOrders = (orders) => {
  const action = {
    type: 'ALL_ORDERS',
    payload: orders
  }
  return action
}

const setMenu = (menu) => {
  const action = {
    type: 'SET_MENU',
    payload: menu
  }
  return action
}

const setAddons = (addons) => {
  const action = {
    type: 'SET_ADDONS',
    payload: addons
  }
  return action
}

export {
  getNotification,
  updateUser,
  selectRestaurant,
  selectMenu,
  selectAddon,
  addComment,
  setAvailableRestaurants,
  removeAddon,
  updateRestaurant,
  setGroupedOrders,
  setOrders,
  setMenu,
  setAddons
}
