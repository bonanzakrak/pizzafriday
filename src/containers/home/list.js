import React, {Component} from 'react'
import _sample from 'lodash.sample'

import cookie from '../../selectors/cookie'
import Loading from './loading'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      jwt: props.jwt || cookie.load('JWToken')
    }
  }

  updateList(restaurant) {
    this.setState({loading: true})
    this.getList(restaurant)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selectedRestaurant && (!this.props.selectedRestaurant || nextProps.selectedRestaurant._id !== this.props.selectedRestaurant._id)) {
      this.updateList(nextProps.selectedRestaurant._id)
    }
  }

  componentWillMount() {
    if (this.props.selectedRestaurant) {
      this.updateList(this.props.selectedRestaurant._id)
    }
  }

  renderList() {
    return this
      .props
      .list
      .map((item) => {
        let checked = false
        if (this.props.selectedItem && item.name === this.props.selectedItem.name)
          checked = true
        return (
          <div className="radio" key={item.name}>
            <label>
              <input checked={checked} type="radio" name="item" value={item.name} onChange={() => this.props.selectItem(item)}/>{item.name} {item.altName && <i className="small text-muted">
                / {item.altName}</i>}
            </label>
          </div>
        )
      })
  }

  selectRandom() {
    const _randomItem = _sample(this.props.list)
    this
      .props
      .selectItem(_randomItem)
      .bind(this)
  }

  render() {

    if (!this.props.selectedRestaurant)
      return (
        <div></div>
      )
    else if (!this.props.selectedRestaurant || this.state.loading)
      return (
        <Loading text={this.title} />
      )
    else
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">{this.title}</div>
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

  getList(restaurant) {

    fetch('http://' + process.env.HOST + this.endpoint + restaurant, {
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.state.jwt}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((json) => {

      this
        .props
        .setList(json)
      this.setState({loading: false})
    }).catch((error) => {

      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }

}

export default List