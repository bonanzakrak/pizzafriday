import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectAddon} from '../actions/index'
import { getSelRestaurant, getAddons } from '../selectors'
class Addons extends Component {
  renderList() {
    if (this.props.addons.length === 0)
      return <span>Brak dodatków w tej restauracji</span>
    else
      return this
        .props
        .addons
        .map((menuItem) => {
          let checked = false
          if (this.props.selectedAddon && menuItem.name === this.props.selectedAddon.name)
            checked = true
          return (
            <div className="radio" key={menuItem.name}>
              <label>
                <input checked={checked} type="radio" name="addonItem" value={menuItem.name} onChange={() => this.props.selectAddon(menuItem)}/>{menuItem.name} {menuItem.altName && <i className="small text-muted">
                  / {menuItem.altName}</i>}
              </label>
            </div>
          )
        })
    }

  render() {
    if (!this.props.selectedRestaurant)
      return null
    else
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">Dodatki</div>
          </div>
          <div className="panel-body">
            {this.renderList()}
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), addons: getAddons(state), selectedAddon: state.selectedAddon, availableRestaurants: state.availableRestaurants}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectAddon: selectAddon
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Addons)