import React, {Component} from 'react'
import {connect} from 'react-redux'
import Profile from '../containers/profile'

import Restaurants from '../containers/restaurants'
import Menu from '../containers/home/menu'
import Addons from '../containers/home/addons'
import SelectedFood from '../containers/selectedFood'
import Nav from './nav'

class Home extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className=" col-md-4">
            <Profile logout={this.props.route.logout}/>
          </div>
          <div className=" col-md-8">
            <SelectedFood/>
          </div>
        </div>
        <Restaurants/>
        <div className="row">
          <div className=" col-md-6">
            <Menu/>
          </div>
          <div className=" col-md-6">
            <Addons/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

Home.propTypes = {
  notifications: React.PropTypes.array
}

export default connect(mapStateToProps)(Home)