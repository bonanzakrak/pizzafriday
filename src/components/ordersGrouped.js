import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Nav from './nav'
import filter from 'lodash.filter'
import Moment from 'moment/moment'
import {setGroupedOrders} from '../actions/index'
import {getOrders} from '../actions/api'

class OrdersGrouped extends Component {
  constructor(props) {
    super(props)
    this.getOrders()
  }

  render() {
    return (
      <div>
        <Nav/>
        <div className="panel panel-default">
          <div className="panel-heading">Orders List {Moment().format('YYYY-MM-DD')}</div>
          <div className="panel-body">
            {this.renderRestaurants()}
          </div>
        </div>
      </div>
    )
  }

  renderRestaurants() {
    return this
      .props
      .groupedOrders
      .map((restaurantOrders) => {

        const restaurantName = filter(this.props.restaurants, {_id: restaurantOrders.restaurant})[0].title
        return (
          <table className="table table-striped" key={restaurantName}>
            <thead>
              <tr>
                <th colSpan="4">{restaurantName}</th>
              </tr>
            </thead>
            <tbody>
              {this.renderOrders(restaurantOrders.sorted)}
            </tbody>
            <tfoot>
              <tr className="active">
                <th colSpan="2" className="text-right">Suma zamówienia:</th>
                <th colSpan="2">{restaurantOrders.total / 100}</th>
              </tr>
            </tfoot>
          </table>
        )
      })
  }

  renderOrders(ordersSorted) {
    return ordersSorted.map((order) => {
      return (
        <tr key={order.name}>
          <td className="col-md-4">{order.name} {order.altName && <i className="small text-muted">
              / {order.altName}</i>}</td>
          <td className="col-md-1">{order.count}</td>
          <td className="col-md-1">{order.price / 100}</td>
          <td className="col-md-6">{this.renderCustomers(order.customers)}</td>
        </tr>
      )
    })
  }

  renderCustomers(customers) {
    return customers.map((customer) => {
      return <div key={customer.user.name}>{customer.user.name} {customer.comment && <i>
          - {customer.comment}</i>}</div>
    })
  }

  getOrders() {
    getOrders('/order/grouped').then((json) => {
      this
        .props
        .setGroupedOrders(json)

    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  }
}

function mapStateToProps(state) {
  return {restaurants: state.restaurants, groupedOrders: state.groupedOrders}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setGroupedOrders: setGroupedOrders
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersGrouped)