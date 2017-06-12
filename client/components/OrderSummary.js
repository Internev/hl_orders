import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
import ConfirmSock from './ConfirmSock'

class OrderSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {shipping: 0}
  }
  componentDidMount () {
    let newAmt = 0
    let newPrice = 0
    this.props.orderDisplay.forEach(sock => {
      newAmt += sock.totalAmt ? sock.totalAmt : 0
      newPrice += sock.totalAmt ? (sock.totalAmt * sock.price) : 0
    })
    this.setState({amount: newAmt, price: newPrice.toFixed(2), shipping: newAmt < 48 ? 10 : 0})
  }
  componentDidUpdate () {
    console.log('summary order this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Order Summary</h2>
          <div>{this.props.msg}</div>
          {this.props.orderDisplay
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <ConfirmSock sock={sock} key={sock.styleID} />
            ))}
          <h2>{this.state.amount} Pairs in Order. Total Price: ${this.state.price} exGST {this.state.shipping ? ' (including $10 shipping)' : ''}</h2>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    orderDisplay: state.orderDisplay,
    orderTotalAmt: state.orderTotalAmt,
    orderTotalPrice: state.orderTotalPrice,
    msg: state.msg
  }
}

export default connect(mapStateToProps)(OrderSummary)
