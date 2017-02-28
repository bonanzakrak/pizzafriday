import { combineReducers } from 'redux'
import UserReducer from './reducer_user'
import RestaurantsReducer from './reducer_restaurants'
import SelectedRestaurantReducer from './reducer_selected_restaurant'

import SelectedAddon from './reducer_selected_addon'
import SelectedMenu from './reducer_selected_menu'
import AddedComment from './reducer_comment'
import AvailableRestaurants from './reducer_available_restaurants'
import GroupedOrdersReducer from './reducer_grouped_orders'
import AllOrdersReducer from './reducer_all_orders'

import MenuReducer from './reducer_menu'
import AddonsReducer from './reducer_addon'
import {reducer as notifications} from 'react-notification-system-redux'

const rootReducer = combineReducers({
  //state: (state = {}) => state
  notifications: notifications,
  user: UserReducer,
  restaurants: RestaurantsReducer,
  selectedRestaurant: SelectedRestaurantReducer,
  selectedMenu: SelectedMenu,
  selectedAddon: SelectedAddon,
  comment: AddedComment,
  availableRestaurants: AvailableRestaurants,
  groupedOrders: GroupedOrdersReducer,
  orders:AllOrdersReducer,
  menu:MenuReducer,
  addons: AddonsReducer
})

export default rootReducer
