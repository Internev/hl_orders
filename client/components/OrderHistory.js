import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
import { getOrderHistory, setOrderDisplay } from './redux/actionCreators'

class OrderHistory extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.dispatch(getOrderHistory(this.props.user))
  }
  componentDidUpdate () {
    console.log('order History this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  handleOrderClick (order) {
    this.props.dispatch(setOrderDisplay(order))
    browserHistory.push('/ordersummary')
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Order History</h2>
          <table className='order-history'>
            <tr>
              <th>Date</th>
              <th>No. of Pairs</th>
              <th>Total Price</th>
            </tr>
            {this.props.orderHistory.map(order => (
              <tr className='pointer' key={order.id} onClick={e => this.handleOrderClick(order)}>
                <td>{order.updatedAt.slice(0, 10)}</td>
                <td>{order.totalamt}</td>
                <td>{(order.totalprice / 100).toFixed(2)}</td>
              </tr>
            ))}
          </table>
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
    orderDisplay: state.orderDisplay,
    orderHistory: state.orderHistory
  }
}

export default connect(mapStateToProps)(OrderHistory)
