import React, {Component} from 'react'
import {Router, Route, Link, IndexRoute} from 'react-router'

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Pizza Day
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/group">Grouped list</Link>
              </li>
              <li>
                <Link to="/orders">List</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav