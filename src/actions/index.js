import debounce from 'lodash.debounce'
import Notifications from 'react-notification-system-redux'
import cookie from 'react-cookie'
let debouncers = {}

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
      saveSelection(action, (restaurants) => {
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
      saveSelection(action, () => {
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
      saveSelection(action, () => {
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
    saveSelection(action, () => {
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
      saveSelection(action, () => {
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

const setLogged = (logged) => {
  const action = {
    type: 'SET_LOGGED',
    payload: logged
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

export {
  updateUser,
  selectRestaurant,
  selectMenu,
  selectAddon,
  addComment,
  setAvailableRestaurants,
  removeAddon,
  setLogged,
  updateRestaurant,
  setGroupedOrders,
  setOrders
}

const saveSelection = (action, cb) => {
  const func = (action, cb) => saveSelectionFull(action, cb)
  return getDebouncer(action.type, 1000, func)(action, cb)
}

const getDebouncer = (key, wait, func) => {
  let debouncer
  if (debouncers.hasOwnProperty(key)) {
    debouncer = debouncers[key]
  } else {
    debouncer = debounce(func, wait)
    debouncers[key] = debouncer
  }
  return debouncer
}

const saveSelectionFull = (action, cb) => {
  fetch(action.apiEndpoint, {
    credentials: "same-origin",
    method: 'POST',
    body: JSON.stringify(action),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${cookie.load('jwt')}`
    }
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Network response was not ok.')
  }).then((response) => {
    cb(response)
  }).catch((error) => {
    console.log('There has been a problem with your fetch operation: ' + error.message)
  })
}
