import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
import ConfirmSock from './ConfirmSock'

class OrderSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {date: ''}
  }
  componentDidMount () {
    let orderDate = this.props.orderDisplay.updatedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('/')
    this.setState({date: orderDate})
    // console.log('summary mount orderdisplay, props:', this.props.orderDisplay)
    // console.log('date:', this.props.orderDisplay.updatedAt)
    // console.log('total amt:', this.props.orderDisplay.totalamt)
    // console.log('total price:', this.props.orderDisplay.totalprice)
    // console.log('shipping', this.props.orderDisplay.shipping)
  }
  componentDidUpdate () {
    // console.log('summary order this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Order Summary</h2>
          <div>On {this.state.date}, the following order was submitted:</div>
          <div>
            {this.props.orderDisplay.order
              .filter(sock => sock.totalAmt)
              .map(sock => (<ConfirmSock sock={sock} key={sock.styleID} />)
              )}
          </div>
          <h2>{this.props.orderDisplay.totalamt} Pairs in Order. Total Price: ${(this.props.orderDisplay.totalprice / 100).toFixed(2)} exGST {this.props.orderDisplay.shipping ? ' (including $10 shipping)' : ''}</h2>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    orderDisplay: state.orderDisplay,
    msg: state.msg
  }
}

export default connect(mapStateToProps)(OrderSummary)
