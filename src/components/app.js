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
import Admin from './admin'
import OrdersGrouped from './ordersGrouped'
import {updateUser} from '../actions/index'
import {bindActionCreators} from 'redux'
import {getSelRestaurant} from '../selectors'
import {
  selectMenu,
  selectAddon,
  addComment,
  setAvailableRestaurants,
  selectRestaurant,
  updateRestaurant
} from '../actions/index'
import filter from 'lodash.filter'
import Notifications from 'react-notification-system-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      loaded: false
    }
  }

  updateAuth(loggedIn, user) {

    this.setState({loggedIn, loaded: true})
    if (user && user.user) {

      this
        .props
        .updateUser(user.user)

      if (user.food) {
        if (user.food.SELECT_MENU) {
          this
            .props
            .selectMenu(user.food.SELECT_MENU, false)
        }

        if (user.food.SELECT_ADDON)
          this.props.selectAddon(user.food.SELECT_ADDON, false)

        if (user.food.ADD_COMMENT)
          this.props.addComment(user.food.ADD_COMMENT, false)
      }

      if (user.restaurants)
        this.props.updateRestaurant(user.restaurants, false)


      if (user.food && user.food.SELECT_MENU && filter(user.activeRestaurants.restaurants, {id: user.food.SELECT_MENU.restaurant}).length)
        this.props.selectRestaurant(filter(this.props.restaurants, {id: user.food.SELECT_MENU.restaurant})[0])
      else if (user.activeRestaurants.restaurants.length > 0)
        this.props.selectRestaurant(user.activeRestaurants.restaurants[0])

      if (user.activeRestaurants)
        this.props.setAvailableRestaurants(user.activeRestaurants.restaurants, false)

    }
  }

  logout() {
    auth.logout(() => this.setState({loggedIn: false}))
  }

  componentWillMount() {
    auth.onChange = this
      .updateAuth
      .bind(this)
    auth.login()
  }

  render() {

    if (!this.state.loaded)
      return (
        <div>Loading</div>
      )
    else if (this.state.loggedIn)
      return (
        <div>
          <Router key={Math.random()} history={hashHistory}>
            <Route path='/orders' component={Orders} onEnter={auth.requireAuth}/>
            <Route path='/admin' component={Admin} onEnter={auth.requireAuth}/>
            <Route path='/group' component={OrdersGrouped} onEnter={auth.requireAuth}/>
            <Route path='*' component={Home} onEnter={auth.requireAuth} logout={this
              .logout
              .bind(this)}/>
          </Router>
          <Notifications notifications={this.props.notifications}/>
        </div>
      )
    else
      return (
        <div>
          <Nav/>
          <Login/>
        </div>
      )
  }
}

const mapStateToProps = (state, props) => {
  return {restaurants: state.restaurants, notifications: state.notifications, sel: getSelRestaurant(state,props)}
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