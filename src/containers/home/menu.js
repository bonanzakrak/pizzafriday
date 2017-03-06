import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectMenu, setMenu} from '../../actions/index'
import {getSelRestaurant} from '../../selectors'

import List from './list'
class Menu extends List {
  constructor(props) {
    super(props)
    this.title = 'Danie główne'
    this.endpoint = '/menu/'
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), selectedItem: state.selectedMenu, list: state.menu}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectItem: selectMenu,
    setList: setMenu
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)