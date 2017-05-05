import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import { saveOrder } from './redux/actionCreators'

class ConfirmOrder extends React.Component {
  constructor (props) {
    super(props)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
  }
  componentDidMount () {
    // console.log('order form filtered:', this.props.orderForm.filter(sock => sock.totalAmt))
  }
  handleOrderSubmit () {
    this.props.dispatch(saveOrder(this.props.orderForm, this.props.user.id))
  }
  render () {
    return (
      <div>
        <Card className='container'>
          <h2 className='card-heading'>Confirm Your Order</h2>
          {this.props.orderForm
            .filter(sock => sock.totalAmt)
            .map(sock => (<div key={sock.styleID}>
              <h3>{sock.styleID} - {sock.desc}</h3>

              <table width='100%' key={sock.styleID}>
                <tbody>
                  <tr>
                    <th width='20%'>Colour</th>
                    <th width='20%'>Pattern</th>
                    <th width='10%'>{sock.styleID + '05'}</th>
                    <th width='10%'>{sock.styleID + '07'}</th>
                    <th width='10%'>{sock.styleID + '10'}</th>
                    <th width='15%'>Price</th>
                    <th width='15%'>Total</th>
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
                            ? colour.patternID + ': ' + colour.patternName
                            : ''}</td>
                        <td>{colour.smallAmt}</td>
                        <td>{colour.regularAmt}</td>
                        <td>{colour.kingAmt}</td>
                        <td>${sock.price.toFixed(2)}</td>
                        <td>${((colour.smallAmt + colour.regularAmt + colour.kingAmt) * sock.price).toFixed(2)}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
    orderTotalPrice: state.orderTotalPrice
  }
}

export default connect(mapStateToProps)(ConfirmOrder)
