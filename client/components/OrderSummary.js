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
          { this.props.msg ? <div className='success'>{this.props.msg}</div> : <div /> }
          <div />
          <div className='summary-info'>
            <div className='col-left'>
              <div>Order Date:</div>
              <div>Total Pairs:</div>
              <div>Total Price (exGST):</div>
            </div>
            <div className='col-right'>
              <div>{this.state.date}</div>
              <div>{this.props.orderDisplay.totalamt}</div>
              <div>${(this.props.orderDisplay.totalprice / 100).toFixed(2)}
                {this.props.orderDisplay.shipping
                  ? ' (including $10 shipping)'
                  : ''}
              </div>
            </div>
          </div>
          <div>
            {this.props.orderDisplay.order
            ? this.props.orderDisplay.order
              .filter(sock => sock.totalAmt)
              .map(sock => (<ConfirmSock sock={sock} key={sock.styleID} />)
              )
            : ''}
          </div>
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
