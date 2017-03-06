import React, {Component} from 'react'

import {
  Router,
  Route,
  Link,
  IndexRoute,
  hashHistory,
  browserHistory
} from 'react-router'
import {connect} from 'react-redux'
import Nav from './nav'
import Login from './login'

import auth from '../actions/auth'
import Home from './home'
import Orders from './orders'

import {Admin, AdminRestaurants} from './admin'
import OrdersGrouped from './ordersGrouped'
import {updateUser} from '../actions/index'
import {bindActionCreators} from 'redux'

import Notify from '../containers/notifications'
import {
  selectMenu,
  selectAddon,
  addComment,
  setAvailableRestaurants,
  selectRestaurant,
  updateRestaurant
} from '../actions/index'
import cookie from '../selectors/cookie'
import filter from 'lodash.filter'

import store from '../store'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      loaded: false
    }
  }

  updateFoodProps(food){
    if (food.SELECT_MENU) {
      this.props.selectMenu(food.SELECT_MENU, false)
    }

    if (food.SELECT_ADDON)
      this.props.selectAddon(food.SELECT_ADDON, false)

    if (food.ADD_COMMENT)
      this.props.addComment(food.ADD_COMMENT, false)
  }

  updateRestaurantsProps(user){
    if (user.restaurants)
      this.props.updateRestaurant(user.restaurants, false)

    if (user.food && user.food.SELECT_MENU && filter(user.activeRestaurants.restaurants, {id: user.food.SELECT_MENU.restaurant}).length)
      this.props.selectRestaurant(filter(this.props.restaurants, {id: user.food.SELECT_MENU.restaurant})[0])
    else if (user.activeRestaurants.restaurants.length > 0)
      this.props.selectRestaurant(user.activeRestaurants.restaurants[0])

    if (user.activeRestaurants)
      this.props.setAvailableRestaurants(user.activeRestaurants.restaurants, false)
  }

  updateAuth(logged, user) {
    this.setState({loaded: true, loggedIn: logged})

    if (user) {
      this.props.updateUser(user.user)

      if (user.food) {
        this.updateFoodProps(user.food)
      }

      this.updateRestaurantsProps(user)
    }
  }

  logout() {
    auth.logout(() => this.setState({loggedIn: false}))
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)

    auth.login()
  }

  render() {
    if (!this.state.loaded)
      return (
        <div>Loading</div>
      )
    else if (this.state.loggedIn) {
      return (
        <div>
          <Router key={Math.random()} history={hashHistory}>
            <Route path='/orders' component={Orders}/>

            <Route path='/admin' component={Admin}/>
            <Route path='/admin/restaurants' component={AdminRestaurants}/>
            <Route path='/admin/users' component={Admin}/>

            <Route path='/group' component={OrdersGrouped}/>
            <Route path='*' component={Home} logout={this.logout.bind(this)}/>
          </Router>
          <Notify/>
        </div>
      )
    } else
      return (
        <div>
          <Nav/>
          <Login/>
        </div>
      )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser: updateUser,
    selectMenu: selectMenu,
    selectAddon: selectAddon,
    addComment: addComment,
    setAvailableRestaurants: setAvailableRestaurants,
    selectRestaurant: selectRestaurant,
    updateRestaurant: updateRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)