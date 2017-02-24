import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectMenu} from '../actions/index'
import _sample from 'lodash.sample'
import filter from 'lodash.filter'
import { getSelRestaurant,getMenu } from '../selectors'

class Menu extends Component {
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
      return null
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
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), menu: getMenu(state), selectedMenu: state.selectedMenu, availableRestaurants: state.availableRestaurants}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectMenu: selectMenu
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)