import React, {Component} from 'react'
import Nav from '../nav'
import {getUsers} from '../../actions/api'

export default class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    getUsers((users) => {
      this.setState({users})
    })
  }

  renderButton(id) {
    return (
      <div></div>
    )
  }

  renderUsers() {
    return this
      .state
      .users
      .map((user) => {

        return (
          <li className="list-group-item" key={user.id}>
            <div className="row">
              <div className="col-md-2"><img src={user.image_48} className="img-thumbnail"/></div>
              <div className="col-md-4">{user.name}</div>
              <div className="col-md-6">{this.renderButton(user.id)}</div>

            </div>
          </li>
        )
      })
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Users {this.state.users.length}</div>
        <ul className="list-group">
          {this.renderUsers()}
        </ul>

      </div>
    )
  }

}