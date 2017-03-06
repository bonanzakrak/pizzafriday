import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectAddon, setAddons} from '../../actions/index'
import _sample from 'lodash.sample'
import {getSelRestaurant} from '../../selectors'
import cookie from '../../selectors/cookie'
import Loading from './loading'
import List from './list'
class Addons extends List {
  constructor(props) {
    super(props)
    this.title = 'Dodatki'
    this.endpoint = '/addon/'
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), selectedItem: state.selectedAddon, list:state.addons}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectItem: selectAddon,
    setList: setAddons
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Addons)