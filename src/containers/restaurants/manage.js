import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateRestaurant} from '../../actions/index'
import {bindActionCreators} from 'redux'
import filter from 'lodash.filter'
import EditRestaurant from './edit'

class ManageRestaurants extends Component {


  renderList() {
    return this
      .props
      .restaurants
      .map((restaurant) => {

        return (<EditRestaurant restaurant={restaurant} key={restaurant.title}/>)
      })
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Update restaurants</div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {restaurants: state.restaurants}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateRestaurant: updateRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurants)