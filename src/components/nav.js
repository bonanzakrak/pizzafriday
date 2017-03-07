import React, {Component} from 'react'
import {Router, Route, Link, IndexRoute} from 'react-router'

class Nav extends Component {
  renderButtons(){
    if(this.props.logged){
      return(
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/orders/group">Grouped list</Link>
            </li>
            <li>
              <Link to="/orders">List</Link>
            </li>
            <li>
              <Link to="/">Order</Link>
            </li>
          </ul>
        </div>
      )
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Pizza Day
            </a>
          </div>

          {this.renderButtons()}
        </div>
      </nav>
    )
  }
}

export default Nav