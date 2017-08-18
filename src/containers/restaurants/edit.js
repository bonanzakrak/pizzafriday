import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateRestaurant} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Router, Route, Link, IndexRoute} from 'react-router'
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

  renderField(label, fieldName, id, value){
    return(
      <div className="form-group">
        <label htmlFor={fieldName + id}>
          {label}
        </label>
        <input type="text" name={fieldName} className="form-control" id={fieldName + id} defaultValue={value} placeholder="Restaurant name"/>

      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this
        .submit
        .bind(this, this.props.restaurant)}>


        {this.renderField("Restaurant name","title",this.props.restaurant.id, this.props.restaurant.title )}

        {this.renderField("Restaurant website","website",this.props.restaurant.id, this.props.restaurant.website )}

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
        <div className="col-md-6"><Link to={"/admin/menu/" + this.props.restaurant._id}>{this.props.restaurant.title}</Link></div>
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
