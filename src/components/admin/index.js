import React, {Component} from 'react'
import Nav from '../nav'

import AdminRestaurants from './restaurants'
import AdminUsers from './users'

export default class Admin extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Admin panel</div>
        <div className="panel-body">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export {AdminRestaurants, AdminUsers}