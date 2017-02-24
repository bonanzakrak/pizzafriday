import React, {Component} from 'react'
import {connect} from 'react-redux'

class Profile extends Component {
  render() {
    if (!this.props.user.user)
      return null
    else
      return (
        <div className="panel panel-default panel-profile">
          <div className="panel-heading">User profile</div>
          <div className="panel-body">

            <img src={this.props.user.user.image_72} className="img-thumbnail"/> {this.props.user.user.name}

            <input type="button" className="btn btn-sm btn-default btn-block" value="wyloguj" onClick={() => this.props.logout()}/>

          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Profile)