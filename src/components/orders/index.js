import React, {Component} from 'react'
import Nav from '../nav'

import OrdersGrouped from './grouped'
import OrdersList from './list'
import Moment from 'moment/moment'

export default class Orders extends Component {
  render() {
    return (

      <div className="panel panel-default">
        <div className="panel-heading">Orders List {Moment().format('YYYY-MM-DD')}</div>
        <div className="panel-body">
          {this.props.children}
        </div>
        
      </div>
    )
  }
}

export {OrdersGrouped, OrdersList}