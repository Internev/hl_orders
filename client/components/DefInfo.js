import React from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
// import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getProxyUser } from './redux/actionCreators'

class DefInfo extends React.Component {
  constructor (props) {
    super(props)
    this.handleUserProxy = this.handleUserProxy.bind(this)
    this.updateCustomerid = this.updateCustomerid.bind(this)
    this.state = {customerid: '', validId: ''}
  }
  componentDidUpdate () {
    // console.log('definfo props:', this.props)
  }
  updateCustomerid (e) {
    e.preventDefault()
    this.setState({customerid: e.target.value})
  }
  handleUserProxy () {
    // console.log('state for customerid:', this.state)
    if (/[A-Za-z]{3}\d{3}/.test(this.state.customerid)) {
      this.setState({validId: ''})
      this.props.dispatch(getProxyUser(this.state.customerid.toUpperCase()))
    } else {
      this.setState({validId: 'Customer Id takes the form: AAA999'})
    }
  }
  render () {
    return (
      <div className='default-shipping'>
        {this.props.user.admin
          ? (<div className='default-shipping-admin'>
            <div>
            Please select a customer for this order. <br />
              <TextField
                hintText='Customer ID'
                maxLength='6'
                value={this.state.customerid}
                onChange={this.updateCustomerid}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.handleUserProxy()
                  }
                }}
                errorText={this.state.validId}
              />&nbsp;
              <RaisedButton
                label='Find Customer'
                onClick={this.handleUserProxy}
              />
            </div>
            {this.props.proxyUser && this.props.proxyUser.email
            ? (
              <div>Ordering on behalf of: <br />
                { this.props.proxyUser.name.split(',').map((line, i) => <div key={i}>{line}</div>) } <br />
              Customer id: {this.props.proxyUser.customerid} <br />
              Email Confirmation to: {this.props.proxyUser.email}
              </div>
            )
            : this.props.proxyUserMsg ? <div>{this.props.proxyUserMsg}</div> : null
          }
          </div>)
          : (<div>Shipping to:
              { this.props.user.name.split(',').map((line, i) => <div key={i}>{line}</div>) }</div>)
        }
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
    addinfo: state.addinfo,
    proxyUser: state.proxyUser,
    proxyUserMsg: state.proxyUserMsg
  }
}

export default connect(mapStateToProps)(DefInfo)
