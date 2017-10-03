import React, {Component} from 'react'

import Nav from '../nav'

import ManageRestaurants from '../../containers/restaurants/manage'
import ActiveRestaurants from '../../containers/restaurants/active'
import AddRestaurants from '../../containers/restaurants/add'
class AdminRestaurants extends Component {
  render() {
    return (

      <div>
        <ActiveRestaurants/>
        <ManageRestaurants/>
        <AddRestaurants/>
      </div>

    )
  }
}

export default AdminRestaurants