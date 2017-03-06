import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addComment} from '../actions/index'
import {removeAddon} from '../actions/index'
import {getSelRestaurant} from '../selectors'
import filter from 'lodash.filter'

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  showItem(item){
    return(
      <span>
        <b>{item.name}</b>
        {item.altName && <i className="small text-muted">
          / {item.altName}</i>}
      </span>
    )
  }

  showMenu() {
    if (this.props.selectedMenu) {
      return (
        <div className="panel-body">Wybrane danie główne:<br/>
          {this.showItem(this.props.selectedMenu)}


          {unavailableRestaurant && <div className="alert alert-warning">Wybrałeś jedzenie z restauracji z której dziś nie zamawiamy</div>}
        </div>
      )
    } else
      return null
  }

  showAddon() {
    if (this.props.selectedAddon)
      return (
        <div className="panel-body">Wybrany dodatek:<br/>
          {this.showItem(this.props.selectedAddon)}
          {unavailableRestaurant && <div className="alert alert-warning">Wybrałeś jedzenie z restauracji z której dziś nie zamawiamy</div>}
          <br/>
          <input type="button" className="btn btn-sm btn-danger" value="usuń dodatek" onClick={() => this.props.removeAddon()}/>
        </div>
      )
    else
      return null
  }

  _onInputChange(event) {
    this
      .props
      .addComment(event.target.value)
  }

  render() {
    if (!this.props.selectedMenu && !this.props.selectedAddon)
      return (
        <div className="panel panel-warning">
          <div className="panel-heading">Twoje zamówienie</div>
          <div className="panel-body">Najpierw wybierz jedzenie.</div>
        </div>
      )
    else {
      const unavailableRestaurant = filter(this.props.availableRestaurants, {_id: this.props.selectedAddon.restaurant}).length === 0
      return (
        <div className="panel panel-success">
          <div className="panel-heading">Twoje zamówienie</div>

          {this.showMenu(unavailableRestaurant)}
          {this.showAddon(unavailableRestaurant)}
          <input name="notes" placeholder="Uwagi do zamówienia" className="form-control" value={this.props.comment} onChange={this
            ._onInputChange
            .bind(this)}/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), selectedAddon: state.selectedAddon, selectedMenu: state.selectedMenu, comment: state.comment, availableRestaurants: state.availableRestaurants}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComment: addComment,
    removeAddon: removeAddon
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)