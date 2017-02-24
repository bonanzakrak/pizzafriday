import React, {Component} from 'react'
import {connect} from 'react-redux'
import Nav from './nav'
import AdminRestaurants from '../containers/adminRestaurants'

class Admin extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav/>
        <AdminRestaurants />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {restaurants: state.restaurants}
}

export default connect(mapStateToProps)(Admin)