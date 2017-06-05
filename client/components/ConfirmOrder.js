import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import { saveOrder } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.handleInfoUpdate = this.handleInfoUpdate.bind(this)
    this.state = {}
  }
  componentDidUpdate () {
    console.log('confirm order this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
    // console.log('order form filtered:', this.props.orderForm.filter(sock => sock.totalAmt))
  }
  handleInfoUpdate (e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value.replace(/[,\n]/g, ' ')})
  }
  handleOrderSubmit () {
    // let addinfo = {}
    // addinfo.address = this.state.address.length
    //   ? this.state.address
    //   : this.props.user.name
    // TotalPrice stored as cents in db.
    this.props.dispatch(saveOrder(this.props.orderForm, this.props.user, (this.props.orderTotalPrice * 100), this.props.orderTotalAmt, this.state))
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          <div>{this.props.msg}</div>
          {this.props.orderForm
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <ConfirmSock sock={sock} key={sock.styleID} />
            ))}
          <div>
            <h2>{this.props.orderTotalAmt} Pairs in Order. Total Price: ${this.props.orderTotalPrice.toFixed(2)} exGST</h2>
            <div>
              Shipping to:
                  { this.props.user.name.split(',').map((line, i) => <div key={i}>{line}</div>) }

            </div>
            <div className='additional-info'>
              <div className='additional-info-box'>
                <div className='additional-info-column'>
                  <TextField
                    hintText='Customer Reference Number'
                    onChange={this.handleInfoUpdate}
                    name='customerRef' /><br />
                  <TextField
                    hintText='Department'
                    onChange={this.handleInfoUpdate}
                    name='department' /><br />
                  <TextField
                    hintText='Contact Person'
                    onChange={this.handleInfoUpdate}
                    name='contactPerson' /><br />
                  <TextField
                    hintText='Email Address (if not shop address)' onChange={this.handleInfoUpdate}
                    type='email'
                    name='email' /><br />
                </div>
                <div className='additional-info-column'>
                  <TextField
                    hintText='Customer Name'
                    onChange={this.handleInfoUpdate}
                    name='customerName' /><br />
                  <TextField
                    hintText='Delivery Address'
                    onChange={this.handleInfoUpdate}
                    name='deliveryAddress'
                    multiLine={true}
                    rows={3} /><br />
                  <TextField
                    hintText='Delivery Instructions'
                    onChange={this.handleInfoUpdate}
                    name='deliveryInstructions' /><br />

                </div>
                <div className='additional-info-column'>
                  <TextField
                    floatingLabelText='Comments'
                    onChange={this.handleInfoUpdate}
                    name='comments'
                    multiLine={true}
                    rows={6} /><br />
                </div>
              </div>
            </div>
            <div>
              {this.props.orderTotalAmt < 25
              ? (<div className='warning-message'>Minimum order quantity is 24 pairs, please adjust your order.</div>)
              : ''}
              <RaisedButton
                label='Adjust Order'
                onClick={browserHistory.goBack}
                />
              <span>&nbsp;</span>
              <RaisedButton
                label='Confirm and Submit Order'
                onClick={this.handleOrderSubmit}
                disabled={this.props.orderTotalAmt < 24}
                />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    id_token: state.id_token,
    isAuthenticated: state.isAuthenticated,
    orderForm: state.orderForm,
    orderTotalAmt: state.orderTotalAmt,
    orderTotalPrice: state.orderTotalPrice,
    msg: state.msg
  }
}

export default connect(mapStateToProps)(ConfirmOrder)
