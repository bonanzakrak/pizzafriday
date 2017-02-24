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
        const isDisabled = filter(this.props.availableRestaurants, {id: restaurant.id}).length === 0

        if (isDisabled)
          attributes.className = 'disabled'
        else if (this.props.selectedRestaurant && restaurant.title === this.props.selectedRestaurant.title)
          attributes.className = 'active'

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

            {this.props.selectedRestaurant &&
              <a href={this.props.selectedRestaurant.website} target="_blank">Restaurant website</a>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {restaurants: state.restaurants, selectedRestaurant: getSelRestaurant(state), availableRestaurants: state.availableRestaurants}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectRestaurant: selectRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)