import React, {Component} from 'react'
import {connect} from 'react-redux'
import Notifications from 'react-notification-system-redux'

class Notify extends Component {
  render() {
    return (<Notifications notifications={this.props.notifications}/>)
  }
}

const mapStateToProps = (state, props) => {
  return {notifications: state.notifications}
}

export default connect(mapStateToProps)(Notify)