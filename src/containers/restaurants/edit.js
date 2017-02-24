import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateRestaurant} from '../../actions/index'
import {bindActionCreators} from 'redux'

class EditRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  submit(restaurant, event) {
    restaurant.title = event.target.title.value
    restaurant.website = event.target.website.value

    this
      .props
      .updateRestaurant(restaurant)

    event.preventDefault()
  }

  renderForm() {
    return (
      <form onSubmit={this
        .submit
        .bind(this, this.props.restaurant)}>
        <div className="form-group">
          <label htmlFor={'title' + this.props.restaurant.id}>
            Restaurant name
          </label>
          <input type="text" name="title" className="form-control" id={'title' + this.props.restaurant.id} defaultValue={this.props.restaurant.title} placeholder="Restaurant name"/>

        </div>
        <div className="form-group">
          <label htmlFor={'website' + this.props.restaurant.id}>
            Restaurant website
          </label>
          <input type="text" name="website" className="form-control" id={'website' + this.props.restaurant.id} defaultValue={this.props.restaurant.website} placeholder="Restaurant website"/>
        </div>

        <div className="form-group clearfix">
          <button type="submit" className="btn btn-success">Submit</button>
          <button type="button" className="btn btn-primary pull-right" onClick={() => this.setState({editing: false})}>Cancel</button>
        </div>
      </form>
    )
  }

  renderList() {
    return (
      <div className="row">
        <div className="col-md-6">{this.props.restaurant.title}</div>
        <div className="col-md-3">
          <a className="btn btn-primary btn-sm" onClick={() => this.setState({editing: true})}>Edit</a>
        </div>
        <div className="col-md-3">
          <a className="btn btn-info btn-sm">Show Menu</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <li className="list-group-item" key={this.props.restaurant.title}>
        {this.state.editing
          ? this.renderForm()
          : this.renderList()}
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateRestaurant: updateRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurant)
