import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectRestaurant} from '../actions/index'
import {bindActionCreators} from 'redux'
import filter from 'lodash.filter'
import { getSelRestaurant } from '../selectors'
class Restaurants extends Component {
  constructor(props){
    super(props)
  }

  renderList() {
    return this
      .props
      .restaurants
      .map((restaurant) => {
        let attributes = {}
        const isDisabled = filter(this.props.availableRestaurants, {_id: restaurant._id}).length === 0

        //if (isDisabled)
         // attributes.className = 'disabled'
        if (this.props.reSelectedRestaurant && restaurant.title === this.props.reSelectedRestaurant.title)
          attributes.className = 'active'

        if(isDisabled)
          return ''
        else
          return (
            <li {...attributes} key={restaurant.title} role="navigation" onClick={() => this.props.selectRestaurant(restaurant, isDisabled)}>
              <a>{restaurant.title}</a>
            </li>
          )
      })
  }

  render() {
    return (
      <div>
        <nav>
          <ul className="nav nav-tabs nav-justified">{this.renderList()}</ul>
        </nav>
        <div className="panel panel-default panel-restaurants">
          <div className="panel-body">

            {this.props.reSelectedRestaurant &&
              <a href={this.props.reSelectedRestaurant.website} target="_blank">Restaurant website</a>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {restaurants: state.restaurants, reSelectedRestaurant: getSelRestaurant(state), availableRestaurants: state.availableRestaurants, selectRestaurant: state.selectRestaurant}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectRestaurant: selectRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)