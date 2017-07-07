import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
// import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import { saveOrder, clearComplete } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'
import AddInfo from './AddInfo'
import DefInfo from './DefInfo'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.submitAllowed = this.submitAllowed.bind(this)
    this.state = {shipping: this.props.orderTotalAmt < 48 ? 10 : 0}
  }
  componentDidUpdate () {
    // console.log('confirm order this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
    if (this.props.orderComplete) {
      this.props.dispatch(clearComplete())
      browserHistory.push('/ordersummary')
    }
  }
  handleOrderSubmit () {
    // TotalPrice stored as cents in db.
    if (this.props.user.admin) {
      this.props.dispatch(saveOrder(this.props.orderForm, this.props.proxyUser, (this.props.orderTotalPrice * 100), this.props.orderTotalAmt, this.props.addinfo, this.state.shipping, this.props.user))
    } else {
      this.props.dispatch(saveOrder(this.props.orderForm, this.props.user, (this.props.orderTotalPrice * 100), this.props.orderTotalAmt, this.props.addinfo, this.state.shipping))
    }
  }
  submitAllowed () {
    return this.props.user.admin
      ? !(this.props.orderTotalAmt > 23 && this.props.proxyUser.email)
      : this.props.orderTotalAmt < 24
  }
  render () {
    return (
      <div>
        <div className={this.props.orderProcessing ? 'overlay-spinner' : 'hidden'}>
          <CircularProgress className='center' />
        </div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          <div>{this.props.msg}</div>
          {this.props.orderForm
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <ConfirmSock sock={sock} key={sock.styleID} />
            ))}
          <div className={this.state.shipping ? 'warning-message' : 'hidden'}>
            Shipping: $10<br />
            Shipping is free for orders over 48 pairs.
          </div>
          <div>
            <h2>{this.props.orderTotalAmt} Pairs in Order. Total Price: ${(this.props.orderTotalPrice + this.state.shipping).toFixed(2)} exGST {this.state.shipping ? ' (including $10 shipping)' : ''}</h2>
            <Tabs>
              <Tab label='Default Information'>
                <DefInfo />
              </Tab>
              <Tab label='Add additional information (optional)'>
                <AddInfo />
              </Tab>
            </Tabs>
            <div>
              {this.props.orderTotalAmt < 24
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
                disabled={this.submitAllowed()}
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
    orderProcessing: state.orderProcessing,
    orderComplete: state.orderComplete,
    msg: state.msg,
    addinfo: state.addinfo,
    proxyUser: state.proxyUser
  }
}

export default connect(mapStateToProps)(ConfirmOrder)
