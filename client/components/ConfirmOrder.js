import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
// import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import { saveOrder, clearOrder, clearProxyUser, setMessage } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'
import AddInfo from './AddInfo'
import DefInfo from './DefInfo'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.submitAllowed = this.submitAllowed.bind(this)
    this.state = {shipping: this.props.order.totalAmt < 48 ? 10 : 0}
  }
  componentDidUpdate () {
    if (!this.props.user.isAuthenticated) {
      browserHistory.push('/logout')
    }
    if (this.props.order.complete) {
      this.props.dispatch(setMessage(this.props.order.msg))
      this.props.dispatch(clearOrder())
      this.props.dispatch(clearProxyUser())
      browserHistory.push('/ordersummary')
    }
  }
  handleOrderSubmit () {
    // TotalPrice stored as cents in db.
    if (this.props.user.admin || this.props.user.agent) {
      this.props.dispatch(saveOrder(this.props.order.form, this.props.proxyUser.user, (this.props.order.totalPrice * 100), this.props.order.totalAmt, this.props.order.addinfo, this.state.shipping, this.props.user))
    } else {
      this.props.dispatch(saveOrder(this.props.order.form, this.props.user, (this.props.order.totalPrice * 100), this.props.order.totalAmt, this.props.order.addinfo, this.state.shipping))
    }
  }
  submitAllowed () {
    return this.props.user.admin || this.props.user.agent
      ? !(this.props.order.totalAmt > 23 && this.props.proxyUser.user.customerid)
      : this.props.order.totalAmt < 24
  }
  render () {
    return (
      <div>
        <div className={this.props.order.processing ? 'overlay-spinner' : 'hidden'}>
          <CircularProgress className='center' />
        </div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          <div>{this.props.root.msg}</div>
          {this.props.order.form
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <ConfirmSock sock={sock} key={sock.styleID} />
            ))}
          <div className={this.state.shipping ? 'warning-message' : 'hidden'}>
            Shipping: $10<br />
            Shipping is free for orders over 48 pairs.
          </div>
          <div>
            <h2>{this.props.order.totalAmt} Pairs in Order. Total Price: ${(this.props.order.totalPrice + this.state.shipping).toFixed(2)} exGST {this.state.shipping ? ' (including $10 shipping)' : ''}</h2>
            <Tabs>
              <Tab label='Information'>
                <DefInfo />
              </Tab>
              <Tab label='Add Details'>
                <AddInfo />
              </Tab>
            </Tabs>
            <div>
              {this.props.order.totalAmt < 24
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
    order: state.order,
    root: state.root,
    proxyUser: state.proxyUser
  }
}

export default connect(mapStateToProps)(ConfirmOrder)
