import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Sock from './Sock'
// import {  } from './redux/actionCreators'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
  }
  componentDidMount () {
    console.log('order form filtered:', this.props.orderForm.filter(sock => sock.totalAmt))
  }
  handleOrderSubmit () {
    console.log('order submit')
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          {this.props.orderForm
            .filter(sock => sock.totalAmt)
            .map(sock => (
              <div key={sock.styleID}>
                Hi i am a sock called: {sock.styleID}
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
    orderForm: state.orderForm,
    orderTotalAmt: state.orderTotalAmt,
    orderTotalPrice: state.orderTotalPrice
  }
}

export default connect(mapStateToProps)(ConfirmOrder)
