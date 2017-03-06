import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectMenu, setMenu} from '../actions/index'
import _sample from 'lodash.sample'
import filter from 'lodash.filter'
import {getSelRestaurant} from '../selectors'
import cookie from '../selectors/cookie'
import Loading from './loading'
class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      jwt: props.jwt || cookie.load('JWToken')
    }
  }

  updateMenu(restaurant) {
    this.setState({loading: true})
    this.getMenu(restaurant)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedRestaurant && (!this.props.selectedRestaurant || nextProps.selectedRestaurant._id !== this.props.selectedRestaurant._id)) {
      this.updateMenu(nextProps.selectedRestaurant._id)
    }
  }

  componentWillMount() {
    if (this.props.selectedRestaurant) {
      this.updateMenu(this.props.selectedRestaurant._id)
    }
  }

  renderList() {
    return this
      .props
      .menu
      .map((menuItem) => {
        let checked = false
        if (this.props.selectedMenu && menuItem.name === this.props.selectedMenu.name)
          checked = true
        return (
          <div className="radio" key={menuItem.name}>
            <label>
              <input checked={checked} type="radio" name="menuItem" value={menuItem.name} onChange={() => this.props.selectMenu(menuItem)}/>{menuItem.name} {menuItem.altName && <i className="small text-muted">
                / {menuItem.altName}</i>}
            </label>
          </div>
        )
      })
  }

  selectRandom() {
    const _randomMenu = _sample(this.props.menu)
    this
      .props
      .selectMenu(_randomMenu)
      .bind(this)
  }

  render() {

    if (!this.props.selectedRestaurant)
      return (
        <div></div>
      )
    else if (!this.props.selectedRestaurant || this.state.loading)
      return (
        <Loading text="Danie główne" />
      )
    else
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">Danie główne</div>
            <div className="panel-title pull-right">
              <input type="button" className="btn btn-sm btn-primary" value="random" onClick={this
                .selectRandom
                .bind(this)}/>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="panel-body">
            <form>
              {this.renderList()}
            </form>
          </div>
        </div>
      )
  }

  getMenu(restaurant) {

    fetch('http://' + process.env.host + '/menu/' + restaurant, {
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.state.jwt}`
      }
    }).then((response) => {
      //console.log(response)
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((json) => {

      this
        .props
        .setMenu(json)
      this.setState({loading: false})
    }).catch((error) => {
      console.log(error)
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }

}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), selectedMenu: state.selectedMenu, menu: state.menu}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectMenu: selectMenu,
    setMenu: setMenu
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)