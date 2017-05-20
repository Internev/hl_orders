import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { uploadOrderForm, uploadStoreGeo, uploadCustomers } from './redux/actionCreators'
import { parseOrderForm, parseStoreGeo, parseCustomers } from '../utils/utils'

const Radmin = React.createClass({
  componentDidUpdate () {
    console.log('Radmin, props:', this.props)
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
  },
  uploadStoreGeo (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      uploadStoreGeo(parseStoreGeo(file.target.result))

      // this.props.dispatch(importFeeds(OPMLParse(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
  },
  uploadOrderForm (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadOrderForm(parseOrderForm(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
  },
  uploadCustomers (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadCustomers(parseCustomers(file.target.result)))
      // this.props.dispatch(uploadOrderForm(parseOrderForm(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
  },
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>HL Orders Admin</h2>
        { this.props.msg ? <div className='success'>{this.props.msg}</div> : <div /> }
        <CardText>
          <div>
            <h3>Recent Orders</h3>
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
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    id_token: state.id_token,
    isAuthenticated: state.isAuthenticated,
    orderForm: state.orderForm,
    msg: state.msg
  }
}

export default connect(mapStateToProps)(Radmin)
