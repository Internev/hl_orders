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
    console.log('summary order this props is:', this.props)
    let orderDate = this.props.order.display.updatedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('/')
    this.setState({date: orderDate})
  }
  componentDidUpdate () {
    if (!this.props.user.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Order Summary</h2>
          { this.props.root.msg ? <div className='success'>{this.props.root.msg}</div> : <div /> }
          <div />
          <div className='summary-info'>
            <div className='col-left'>
              <div>Order Date:</div>
              <div>Total Pairs:</div>
              <div>Total Price (exGST):</div>
            </div>
            <div className='col-right'>
              <div>{this.state.date}</div>
              <div>{this.props.order.display.totalamt}</div>
              <div>${(this.props.order.display.totalprice / 100).toFixed(2)}
                {this.props.order.display.shipping
                  ? ' (including $10 shipping)'
                  : ''}
              </div>
            </div>
          </div>
          <div>
            {this.props.order.display.order
            ? this.props.order.display.order
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
    user: state.user,
    order: state.order,
    root: state.root
  }
}

export default connect(mapStateToProps)(OrderSummary)
