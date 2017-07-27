import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import StoreMap from './geo/StoreMap'
// import TextField from 'material-ui/TextField'
import { uploadOrderForm, uploadCustomers, getOrderHistory, setOrderDisplay, getProxyUser, toggleAdmin, toggleAgent, setMessage } from './redux/actionCreators'
import { uploadStoreGeo, uploadGeoProcessing, getStoreGeo } from './redux/geoActionCreators'
import { parseOrderForm, parseStoreGeo, parseCustomers } from '../utils/utils'
import axios from 'axios'

class Radmin extends React.Component {
  constructor (props) {
    super(props)
    this.uploadStoreGeo = this.uploadStoreGeo.bind(this)
    this.uploadOrderForm = this.uploadOrderForm.bind(this)
    this.uploadCustomers = this.uploadCustomers.bind(this)
    this.updateCustomerSearch = this.updateCustomerSearch.bind(this)
    this.handleUserProxy = this.handleUserProxy.bind(this)
    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.toggleAgent = this.toggleAgent.bind(this)
    this.state = {customerSearch: '', validId: ''}

    this.storeGeoTest = this.storeGeoTest.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getOrderHistory())
    // console.log('Radmin, props:', this.props)
    // if (!this.props.user.admin) {
    //   browserHistory.push('/')
    // }
  }
  componentDidUpdate () {
    console.log('Radmin, props:', this.props)
    if (!this.props.user.admin) {
      browserHistory.push('/')
    }
    if (!this.props.user.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  uploadStoreGeo (e) {
    this.props.dispatch(uploadGeoProcessing())
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadStoreGeo(parseStoreGeo(file.target.result)))
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
  updateCustomerSearch (e) {
    e.preventDefault()
    this.setState({customerSearch: e.target.value})
  }
  handleUserProxy () {
    // console.log('state for customerSearch:', this.state)
    if (/[A-Za-z]{3}\d{3}/.test(this.state.customerSearch)) {
      this.setState({validId: ''})
      this.props.dispatch(getProxyUser(this.state.customerSearch))
    } else {
      this.setState({validId: 'IDs take the form: AAA999'})
    }
  }
  toggleAdmin () {
    if (this.props.user.customerid !== this.props.proxyUser.user.customerid && this.props.user.admin) {
      this.props.dispatch(toggleAdmin(this.props.proxyUser.user))
    }
  }
  toggleAgent () {
    if (this.props.user.customerid !== this.props.proxyUser.user.customerid && this.props.user.admin) {
      this.props.dispatch(toggleAgent(this.props.proxyUser.user))
    }
  }
  storeGeoTest () {
    this.props.dispatch(getStoreGeo())
  }
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>HL Orders Admin</h2>
        { this.props.root.msg ? <div className='success'>{this.props.root.msg}</div> : <div /> }
        { this.props.order.msg ? <div className='success'>{this.props.order.msg}</div> : <div /> }
        { this.props.geo.msg ? <div className='success'>{this.props.geo.msg}</div> : <div /> }
        <CardText>
          <div>
            <h3>Recent Orders</h3>
            <table className='order-history'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>No. of Pairs</th>
                  <th>Total Price</th>
                  <th>Customer Code</th>
                </tr>
              </thead>
              <tbody>
                {this.props.order.history.map(order => (
                  <tr className='pointer' key={order.id} onClick={e => this.handleOrderClick(order)}>
                    <td>{order.updatedAt.slice(0, 10)}</td>
                    <td>{order.totalamt}</td>
                    <td>{(order.totalprice / 100).toFixed(2)}</td>
                    <td>{order.user.customerid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{paddingTop: '25px'}}>
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
            />&nbsp;
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
            />&nbsp;
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
            />&nbsp;
            <RaisedButton
              label='StoreGeoTest'
              onClick={this.storeGeoTest}
            />&nbsp;
        </div>
        <div className='user-upgrade'>
          <div>
            Upgrade a user:<br />
            <TextField
              hintText='Search by ID'
              maxLength={6}
              value={this.state.customerSearch}
              onChange={this.updateCustomerSearch}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  this.handleUserProxy()
                }
              }}
              errorText={this.state.validId}
            />&nbsp;
            <RaisedButton
              label='Search'
              onClick={this.handleUserProxy}
            />
          </div>
          <div>
            {this.props.proxyUser.user.name
            ? (<div className='user-upgrade-info'>
              <div>{ this.props.proxyUser.user.name.split(',').map((line, i) => <div key={i}>{line}</div>) }
                {this.props.proxyUser.user.email}
              </div>
              <div className='checkbox'>
                <Checkbox
                  checked={this.props.proxyUser.user.admin}
                  label='Admin'
                  onCheck={this.toggleAdmin}
                  />
              </div>
              <div className='checkbox'>
                <Checkbox
                  checked={this.props.proxyUser.user.agent}
                  label='Agent'
                  onCheck={this.toggleAgent}
                  />
              </div>
            </div>)
            : ''}
          </div>
        </div>
          <div>
            {this.props.geo.failures.length > 0
            ? <table>
              <tbody>
                {this.props.geo.failures.map((failure, i) => (
                  <tr key={i}>
                    <td>{failure.store.name}</td>
                    <td>{failure.store.address}</td>
                    <td>{failure.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            : null}
          </div>
          <div style={{width: '100%', height: '600px'}}>
            <StoreMap />
          </div>
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    order: state.order,
    root: state.root,
    // orderHistory: state.orderHistory,
    proxyUser: state.proxyUser,
    geo: state.geo
  }
}

export default connect(mapStateToProps)(Radmin)
