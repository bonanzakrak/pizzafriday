import React, {Component} from 'react'

import Nav from '../nav'

import ManageRestaurants from '../../containers/restaurants/manage'
import ActiveRestaurants from '../../containers/restaurants/active'

class AdminRestaurants extends Component {
  render() {
    return (

      <div>
        <ActiveRestaurants/>
        <ManageRestaurants/>
      </div>

    )
  }
}

export default AdminRestaurants