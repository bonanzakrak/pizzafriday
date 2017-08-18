import React, {
  Component
} from 'react'
import Nav from '../nav'
//import {} from '../../actions/api'
import {
  Router,
  Route,
  Link,
  IndexRoute
} from 'react-router'
import filter from 'lodash.filter'
import cookie from '../../selectors/cookie'

export default class AdminMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      jwt: props.jwt || cookie.load('JWToken'),
      menu: []
    }
    this.endpoint = '/menu/'
  }

  handleUpdate(idx) {
    console.log(idx)
    this.saveMenu(this.state.menu[idx])
  }

  handleRemove(idx) {
    console.log(idx)
  }

  moveUp(idx) {
    this.setState({
      menu: this.state.menu.move(idx, idx - 1)
    });
    this.saveOrder();
  }

  moveDown(idx) {
    this.setState({
      menu: this.state.menu.move(idx, idx + 1)
    });
    this.saveOrder();
  }

  componentWillMount() {
    if (this.props.params.restaurant) {
      this.updateList(this.props.params.restaurant)
    }
  }

  handleChange(field, idx, event) {
    let menu = this.state.menu.slice()
    menu[idx][field] = event.target.value
    this.setState({
      menu: menu
    });
  }

  saveOrder() {
    let menu = this.state.menu.slice()
      .map((item, idx) => {
        return {
          _id: item._id,
          idx: idx
        }
      });

    this.postOrder(menu);
  }

  renderList() {
    return this
      .state
      .menu
      .map((item, idx) => {
        // this looks like shit
        return (
          <div key={item._id}>
            <div className="form-group">
              <input type="text" name="name" value={item.name} onChange={this.handleChange.bind(this,'name',idx)}></input>
              <input type="text" name="altName" value={item.altName ? item.altName : ''} onChange={this.handleChange.bind(this,'altName',idx)}></input>
              <input type="text" name="price" value={item.price} onChange={this.handleChange.bind(this,'price',idx)}></input>
              <input type="hidden" name="idx" value={idx} onChange={()=>{}}></input>
              <input type="hidden" name="_id" defaultValue={item._id}></input>
              <input type="button" onClick={() => this.handleUpdate(idx)} value="update"></input>
              <input type="button" onClick={() => this.handleRemove(idx)} value="remove"></input>
              {idx > 0 &&
                <input type="button" onClick={() => this.moveUp(idx)} value="moveUp"></input>
              }
              {idx < this.state.menu.length-1 &&
                <input type="button" onClick={() => this.moveDown(idx)} value="moveDown"></input>
              }
            </div>
          </div>
        )
      })
  }

  renderAdd() {
    return (
      <div>
        <div className="form-group">
          <input type="text" name="name"></input>
          <input type="text" name="altName"></input>
          <input type="text" name="price"></input>

          <input type="button" onClick={() => this.handleAdd(idx)} value="add"></input>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Menu</div>
        <ul className="">
          {this.renderList()}
        </ul>
        {this.renderAdd()}

      </div>
    )
  }

  updateList(restaurant) {
    this.setState({
      loading: true
    })
    this.getList(restaurant)
  }

  getList(restaurant) {

    fetch('http://' + process.env.HOST + this.endpoint + restaurant, {
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.state.jwt}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((json) => {

        this
          .setState({
            menu: json
          })
        console.log(json)

        this.setState({
          loading: false
        })
      })
      .catch((error) => {

        console.log('There has been a problem with your fetch operation: ' + error.message)
      })
  }

  saveMenu(item, cb) {
    console.log(`${process.env.HOST}/menu/${item._id}`)
    fetch(`http://${process.env.HOST}/menu/${item._id}`, {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.state.jwt}`
        }
      })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => {
        //cb(response)
      })
      .catch((error) => {
        console.log(error)
        console.log('There has been a problem with your fetch operation1: ' + error.message)
      })
  }

  postOrder(items, cb) {

    fetch(`http://${process.env.HOST}/menu/order`, {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(items),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.state.jwt}`
        }
      })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => {
        //cb(response)
      })
      .catch((error) => {
        console.log(error)
        console.log('There has been a problem with your fetch operation1: ' + error.message)
      })
  }


}

Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this; // for testing purposes
};
