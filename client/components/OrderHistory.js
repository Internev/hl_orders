import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import { getOrderHistory, setOrderDisplay } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'

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
          {this.props.orderHistory.map(order => (
            <div className='pointer' key={order.id} onClick={e => this.handleOrderClick(order)}>
              Date: {order.updatedAt.slice(0, 10)}, Pairs: {order.totalamt}, Total Price: {(order.totalprice / 100).toFixed(2)}
            </div>
          ))}
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
