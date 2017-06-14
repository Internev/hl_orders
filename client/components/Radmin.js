import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import { uploadOrderForm, uploadStoreGeo, uploadCustomers, getOrderHistory, setOrderDisplay } from './redux/actionCreators'
import { parseOrderForm, parseStoreGeo, parseCustomers } from '../utils/utils'

class Radmin extends React.Component {
  constructor (props) {
    super(props)
    this.uploadStoreGeo = this.uploadStoreGeo.bind(this)
    this.uploadOrderForm = this.uploadOrderForm.bind(this)
    this.uploadCustomers = this.uploadCustomers.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getOrderHistory())
    console.log('Radmin, props:', this.props)

  }
  componentDidUpdate () {
    console.log('Radmin, props:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  uploadStoreGeo (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      uploadStoreGeo(parseStoreGeo(file.target.result))
    }
    reader.readAsText(e.target.files[0])
    this.storeGeo.value = null
  }
  uploadOrderForm (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadOrderForm(parseOrderForm(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
    this.orderInput.value = null
  }
  uploadCustomers (e) {
    e.preventDefault()
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadCustomers(parseCustomers(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
    this.customerUpload.value = null
  }
  handleOrderClick (order) {
    this.props.dispatch(setOrderDisplay(order))
    browserHistory.push('/ordersummary')
  }
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>HL Orders Admin</h2>
        { this.props.msg ? <div className='success'>{this.props.msg}</div> : <div /> }
        <CardText>
          <div>
            <h3>Recent Orders</h3>
            <table className='order-history'>
              <tr>
                <th>Date</th>
                <th>No. of Pairs</th>
                <th>Total Price</th>
                <th>Customer Code</th>
              </tr>
              {this.props.orderHistory.map(order => (
                <tr className='pointer' key={order.id} onClick={e => this.handleOrderClick(order)}>
                  <td>{order.updatedAt.slice(0, 10)}</td>
                  <td>{order.totalamt}</td>
                  <td>{(order.totalprice / 100).toFixed(2)}</td>
                  <td>{order.user.customerid}</td>
                </tr>
              ))}
            </table>
          </div>
          <CardActions>
            <input
              type='file'
              accept='.csv'
              id='storeGeo'
              ref={ref => this.storeGeo = ref}
              style={{display: 'none'}}
              onChange={this.uploadStoreGeo}
            />
            <RaisedButton
              label='Upload Store Locator Data'
              onClick={e => {
                setTimeout(() => {
                  this.storeGeo.click()
                }, 200)
              }}
            />
            <input
              type='file'
              accept='.csv'
              id='orderInput'
              ref={ref => this.orderInput = ref}
              style={{display: 'none'}}
              onChange={this.uploadOrderForm}
            />
            <RaisedButton
              label='Upload Order Form'
              onClick={e => {
                setTimeout(() => {
                  this.orderInput.click()
                }, 200)
              }}
            />
            <input
              type='file'
              accept='.csv'
              id='customerUpload'
              ref={ref => this.customerUpload = ref}
              style={{display: 'none'}}
              onChange={this.uploadCustomers}
            />
            <RaisedButton
              label='Upload Customer List'
              onClick={e => {
                setTimeout(() => {
                  this.customerUpload.click()
                }, 200)
              }}
            />
          </CardActions>

        </CardText>
      </Card>
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
    msg: state.msg,
    orderHistory: state.orderHistory
  }
}

export default connect(mapStateToProps)(Radmin)
