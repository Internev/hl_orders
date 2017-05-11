import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import { saveOrder } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
  }
  componentDidMount () {
    // console.log('order form filtered:', this.props.orderForm.filter(sock => sock.totalAmt))
  }
  handleOrderSubmit () {
    // TotalPrice stored as cents in db.
    this.props.dispatch(saveOrder(this.props.orderForm, this.props.user.id, (this.props.orderTotalPrice * 100)))
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          <div>Msg: {this.props.msg}</div>
          {this.props.orderForm
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <ConfirmSock sock={sock} key={sock.styleID}/>
            ))}
          <div>
            <h2>{this.props.orderTotalAmt} Socks in Order. Total Price: ${this.props.orderTotalPrice.toFixed(2)}</h2>
            <div>
              <RaisedButton
                label='Adjust Order'
                onClick={browserHistory.goBack}
                />
              <span>&nbsp;</span>
              <RaisedButton
                label='Confirm and Submit Order'
                onClick={this.handleOrderSubmit}
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
