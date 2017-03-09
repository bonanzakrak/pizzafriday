import React, {Component} from 'react'
import Nav from '../nav'

import AdminRestaurants from './restaurants'
import AdminUsers from './users'
import {Router, Route, Link, IndexRoute} from 'react-router'

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.modules = [
      {
        name: 'Users',
        pathname: '/admin/users'
      }, {
        name: 'Restaurants',
        pathname: '/admin/restaurants'
      }
    ]
  }

  renderMenu() {
    const currentLocation = this.props.location.pathname

    return this
      .modules
      .map((module) => {
        let attributes = {}
        if (currentLocation === module.pathname)
          attributes.className = 'active'

        return (
          <li {...attributes} role="navigation" key={module.name}>
            <Link to={module.pathname}>{module.name}</Link>
          </li>
        )
      })
  }

  render() {
    return (
      <div>
        <nav>
          <ul className="nav nav-pills nav-justified">
            {this.renderMenu()}
          </ul>
        </nav>

        {this.props.children
          ? this.props.children
            : <div className="panel panel-default">
              <div className="panel-heading">Admin panel</div>
              <div className="panel-body">
                select module
              </div>

          </div>}
      </div>
    )
  }
}

export {AdminRestaurants, AdminUsers}