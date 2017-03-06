import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectAddon, setAddons} from '../actions/index'
import {getSelRestaurant} from '../selectors'
import cookie from '../selectors/cookie'

import Loading from './loading'
class Addons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  updateAddon(restaurant) {
    this.setState({loading: true})
    this.getAddon(restaurant)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedRestaurant && (!this.props.selectedRestaurant || nextProps.selectedRestaurant._id !== this.props.selectedRestaurant._id)) {
      this.updateAddon(nextProps.selectedRestaurant._id)
    }
  }

  componentWillMount() {
    if (this.props.selectedRestaurant) {
      this.updateAddon(this.props.selectedRestaurant._id)
    }
  }

  renderList() {
    if (this.props.addons.length === 0)
      return <span>Brak dodatków w tej restauracji</span>
    else
      return this
        .props
        .addons
        .map((addonItem) => {
          let checked = false
          if (this.props.selectedAddon && addonItem.name === this.props.selectedAddon.name)
            checked = true
          return (
            <div className="radio" key={addonItem.name}>
              <label>
                <input checked={checked} type="radio" name="addonItem" value={addonItem.name} onChange={() => this.props.selectAddon(addonItem)}/>{addonItem.name} {addonItem.altName && <i className="small text-muted">
                  / {addonItem.altName}</i>}
              </label>
            </div>
          )
        })
    }

  render() {
    if (!this.props.selectedRestaurant)
      return (<div></div>)
    else if (this.state.loading)
      return (
        <Loading text="Dodatki" />
      )
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

  getAddon(restaurant) {
    fetch('http://' + process.env.host + '/addon/' + restaurant, {
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookie.load('JWToken')}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((json) => {
      this
        .props
        .setAddons(json)
      this.setState({ loading: false})
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }
}

const mapStateToProps = (state) => {
  return {selectedRestaurant: getSelRestaurant(state), selectedAddon: state.selectedAddon, availableRestaurants: state.availableRestaurants, addons:state.addons}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectAddon: selectAddon,
    setAddons: setAddons
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Addons)