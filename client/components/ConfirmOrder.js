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
              <table width='100%' key={sock.styleID}>
                <th>{sock.styleID} - {sock.desc}</th>
                <tbody>
                <tr>
                  <td>Colour</td>
                  <td>Pattern</td>
                  <td>{sock.styleID + '05'}</td>
                  <td>{sock.styleID + '07'}</td>
                  <td>{sock.styleID + '10'}</td>
                  <td>Price</td>
                </tr>
                  {sock.colours
                    .filter(colour => {
                      if (colour.smallAmt) return true
                      if (colour.regularAmt) return true
                      if (colour.kingAmt) return true
                      return false
                    })
                    .map(colour => (
                    <tr key={colour.colourID}>
                    <td>{colour.colourID}: {colour.colourName}</td>
                    <td>{colour.patternID > 0
                        ? colour.patternID+': ' + colour.patternName
                        : ''}</td>
                    <td>{colour.smallAmt}</td>
                    <td>{colour.regularAmt}</td>
                    <td>{colour.kingAmt}</td>
                    <td>{sock.price}</td>
                  </tr>
                  ))}
                  </tbody>
              </table>
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
