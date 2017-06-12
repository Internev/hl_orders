import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import { getOrderHistory } from './redux/actionCreators'
import ConfirmSock from './ConfirmSock'

class OrderHistory extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.dispatch(getOrderHistory())
  }
  componentDidUpdate () {
    console.log('order History this props is:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
    if (this.props.orderComplete) {
      browserHistory.push('/ordersummary')
    }
    // console.log('order form filtered:', this.props.orderDisplay.filter(sock => sock.totalAmt))
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Order History</h2>

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
    orderDisplay: state.orderDisplay
  }
}

export default connect(mapStateToProps)(OrderHistory)
