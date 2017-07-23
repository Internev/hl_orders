import React from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
// import { Card } from 'material-ui/Card'
// import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { updateAddInfo } from './redux/actionCreators'

class AddInfo extends React.Component {
  constructor (props) {
    super(props)
    this.handleInfoUpdate = this.handleInfoUpdate.bind(this)
  }
  handleInfoUpdate (e) {
    e.preventDefault()
    this.props.dispatch(updateAddInfo(e.target.name, e.target.value))
    // this.setState({[e.target.name]: e.target.value.replace(/[,\n]/g, ' ')})
  }
  render () {
    return (
      <div className='additional-info'>
        <div className='additional-info-box'>
          <div className='additional-info-column'>
            <TextField
              hintText='Customer Order Number (12)'
              maxLength='12'
              value={this.props.order.addinfo.customerRef}
              onChange={this.handleInfoUpdate}
              name='customerRef' /><br />
            <TextField
              hintText='Department (8)'
              maxLength='8'
              value={this.props.order.addinfo.department}
              onChange={this.handleInfoUpdate}
              name='department' /><br />
            <TextField
              hintText='Contact Person'
              value={this.props.order.addinfo.contactPerson}
              onChange={this.handleInfoUpdate}
              name='contactPerson' /><br />
            <TextField
              hintText='Email Address (if not shop address)'
              value={this.props.order.addinfo.email}
              onChange={this.handleInfoUpdate}
              type='email'
              name='email' /><br />
          </div>
          <div className='additional-info-column'>
            <TextField
              hintText='Customer Name'
              value={this.props.order.addinfo.customerName}
              onChange={this.handleInfoUpdate}
              name='customerName' /><br />
            <TextField
              hintText='Delivery Address'
              value={this.props.order.addinfo.deliveryAddress}
              onChange={this.handleInfoUpdate}
              name='deliveryAddress'
              multiLine={true}
              rows={3} /><br />
            <TextField
              hintText='Delivery Instructions'
              value={this.props.order.addinfo.deliveryInstructions}
              onChange={this.handleInfoUpdate}
              name='deliveryInstructions' /><br />

          </div>
          <div className='additional-info-column'>
            <TextField
              floatingLabelText='Special Instructions'
              value={this.props.order.addinfo.comments}
              onChange={this.handleInfoUpdate}
              name='comments'
              multiLine={true}
              rows={6} /><br />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(AddInfo)
