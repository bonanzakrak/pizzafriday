import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateRestaurant,addRestaurant} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Router, Route, Link, IndexRoute} from 'react-router'
class EditRestaurant extends Component {
  constructor(props) {
    super(props)

  }

  submit( event) {
    let restaurant = {}
    restaurant.title = event.target.title.value
    restaurant.website = event.target.website.value

    this
      .props
      .addRestaurant(restaurant)

    event.preventDefault()
  }

  renderField(label, fieldName, id, value){
    return(
      <div className="form-group">
        <label htmlFor={fieldName + id}>
          {label}
        </label>
        <input type="text" name={fieldName} className="form-control" id={fieldName + id} defaultValue={value} placeholder={label}/>

      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this
        .submit
        .bind(this)}>

        {this.renderField("Restaurant name","title",'new','')}

        {this.renderField("Restaurant website","website",'new', '' )}

        <div className="form-group clearfix">
          <button type="submit" className="btn btn-success">Add</button>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add restaurant</div>
        <div className="panel-body">
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateRestaurant: updateRestaurant,
    addRestaurant: addRestaurant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurant)
