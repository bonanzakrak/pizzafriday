import React, {Component} from 'react'
import Nav from '../nav'
import {getUsers, setUserProvilages} from '../../actions/api'
import {Router, Route, Link, IndexRoute} from 'react-router'
import filter from 'lodash.filter'

export default class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    getUsers((users) => {
      this.setState({users})
    })

    this.changeAdmin = (id) => {
      let tempArray = this.state.users
      let user = filter(tempArray, {id: id})[0]

      const cb = (success, dbUser) => {
        if (success){
          user.admin = dbUser.admin
          this.setState({users: tempArray})

        }
      }
      setUserProvilages(id, !user.admin, cb)
    }
  }

  renderButton(id, admin) {
    return (
      <a onClick={() => this.changeAdmin(id)} className={"btn " + (admin
        ? 'btn-success'
        : 'btn-warning')}>{admin && 'make standard' || 'make admin'}</a>
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
              <div className="col-md-2">{user.admin && "admin"}</div>
              <div className="col-md-4">{this.renderButton(user.id, user.admin)}</div>
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