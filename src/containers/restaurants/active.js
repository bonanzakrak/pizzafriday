import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAvailableRestaurants} from '../../actions/index'
import {bindActionCreators} from 'redux'
import filter from 'lodash.filter'

class ActiveRestaurants extends Component {
  renderList() {
    return this
      .props
      .restaurants
      .map((restaurant) => {

        const checked = filter(this.props.availableRestaurants, {_id: restaurant._id}).length === 0
          ? false
          : true

        return (
          <div className="checkbox" key={restaurant.title}>
            <label>
              <input checked={checked} type="checkbox" name="restaurant" value={restaurant.title} onChange={() => this.props.setAvailableRestaurants(restaurant,true)}/>{restaurant.title}
            </label>
          </div>
        )
      })
  }

  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">Select active restaurants</div>
          <div className="panel-body">
            {this.renderList()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    availableRestaurants: state.availableRestaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAvailableRestaurants: setAvailableRestaurants
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRestaurants)