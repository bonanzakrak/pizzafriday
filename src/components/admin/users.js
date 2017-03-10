import React, {Component} from 'react'
import Nav from '../nav'
import {getUsers} from '../../actions/api'

export default class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.getUsers()
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Users panel</div>
        <div className="panel-body">
          Users panel
        </div>
      </div>
    )
  }

  getUsers() {
    getUsers(function(users) {
      this.setState(users)
    })
  }

}