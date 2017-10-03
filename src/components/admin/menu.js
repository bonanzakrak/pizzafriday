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
import {
  addMenuItem
} from '../../actions/api'

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
    this.saveMenu(this.state.menu[idx])
  }

  handleRemove(idx) {
    //console.log()
    let menu = this.state.menu.slice()
    this.removeMenuItem(menu[idx]);

    menu.splice(idx, 1)

    menu = menu.map((item, index) => {
      if (idx < index)
        item.idx -= 1
      return item
    });

    this.setState({
      menu
    })

    this.saveOrder();
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
    if (field === 'price')
      if (Number.isNaN(parseInt(event.target.value)))
        return false

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
            <div className="row">
              <div className="form-group col-sm-3">

                <input type="text" className="form-control" name="name" value={item.name} onChange={this.handleChange.bind(this,'name',idx)}></input>
              </div>
              <div className="form-group col-sm-3">
                <input type="text" className="form-control" name="altName" value={item.altName ? item.altName : ''} onChange={this.handleChange.bind(this,'altName',idx)}></input>
              </div>
              <div className="form-group col-sm-2">
                <input type="number" className="form-control" step="1" name="price" value={item.price} onChange={this.handleChange.bind(this,'price',idx)}></input>
              </div>

              <input type="hidden" name="idx" value={idx} onChange={()=>{}}></input>
              <input type="hidden" name="_id" defaultValue={item._id}></input>
              <div className="form-group col-sm-4">
                <input type="button" onClick={() => this.handleUpdate(idx)} value="update"  className="btn"></input> &nbsp;
                <input type="button" onClick={() => this.handleRemove(idx)} value="remove"  className="btn"></input> &nbsp;
                {idx > 0 &&
                  <input type="button" onClick={() => this.moveUp(idx)} value="&#9650;"  className="btn"></input>
                }
                 &nbsp;
                {idx < this.state.menu.length-1 &&
                  <input type="button" onClick={() => this.moveDown(idx)} value="&#9660;"  className="btn"></input>
                }
              </div>
            </div>
          </div>
        )
      })
  }

  submit(event) {
    event.preventDefault()
    const name = event.target.name.value
    const altName = event.target.altName.value
    const price = parseInt(event.target.price.value)

    const $this = this

    if (!Number.isNaN(price) && name.length > 0) {
      addMenuItem(name, altName, price, $this.props.params.restaurant, function (e, s) {
        if (e) {
          let menu = $this.state.menu.slice()
          menu.push(s)
          $this.setState({
            menu
          })
        }
      })
    } else {
      alert('NaN')
    }
  }

  renderAdd() {
    return (
      <div className="row">
        <div className="form-group">
          <form onSubmit={this
            .submit
            .bind(this)}>
            <div className="form-group col-sm-3">
              <input type="text" name="name"  className="form-control" placeholder="Name"></input>
            </div>
            <div className="form-group col-sm-3">
              <input type="text" name="altName" className="form-control" placeholder="Alt name"></input>
            </div>
            <div className="form-group col-sm-2">
              <input type="number" step="1" name="price" className="form-control" placeholder="price"></input>
            </div>
            <div className="form-group col-sm-4">
              <input type="submit" value="add" className="btn"></input>
            </div>
          </form>
        </div>
      </div>
    )
  }


  /* onHide={closeModal} */
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Menu</div>
        <div className="panel-body">
          {this.renderList()}
          <hr />
          {this.renderAdd()}
        </div>
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
        if (response.ok) {
          return response
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

  removeMenuItem(item) {
    fetch(`http://${process.env.HOST}/menu/${item._id}`, {
        credentials: "same-origin",
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.state.jwt}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => {
        console.log(response)
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
