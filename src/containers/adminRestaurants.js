import React, {Component} from 'react'

import ManageRestaurants from './restaurants/manage'
import ActiveRestaurants from './restaurants/active'


class AdminRestaurants extends Component {


  render() {
    return (
      <div>
        <ActiveRestaurants />
        <ManageRestaurants />
      </div>
    )
  }
}


export default AdminRestaurants