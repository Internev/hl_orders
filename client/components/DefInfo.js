import React from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
// import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import ProxyUserPicker from './ProxyUserPicker'
import { getProxyUser } from './redux/actionCreators'

class DefInfo extends React.Component {
  constructor (props) {
    super(props)
    this.handleUserProxy = this.handleUserProxy.bind(this)
    this.updateCustomerSearch = this.updateCustomerSearch.bind(this)
    this.state = {customerSearch: '', validId: ''}
  }
  componentDidUpdate () {
    // console.log('definfo props:', this.props)
  }
  updateCustomerSearch (e) {
    e.preventDefault()
    this.setState({customerSearch: e.target.value})
  }
  handleUserProxy () {
    // console.log('state for customerSearch:', this.state)
    if (this.state.customerSearch) {
      this.setState({validId: ''})
      this.props.dispatch(getProxyUser(this.state.customerSearch))
    } else {
      this.setState({validId: 'Please enter a search term'})
    }
  }
  render () {
    return (
      <div className='default-shipping'>
        {this.props.user.admin
          ? (<div className='default-shipping-admin'>
            <div>
            Please select a customer for this order. <br />
            Search by ID, Email Address, Name, or Postcode. <br />
              <TextField
                hintText='Search Customers'
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
                label='Find Customer'
                onClick={this.handleUserProxy}
              />
              {this.props.proxyUserList.length > 1
              ? <ProxyUserPicker />
              : <div />}
            </div>
            {this.props.proxyUser && this.props.proxyUser.customerid
            ? (
              <div>Ordering on behalf of: <br />
                { this.props.proxyUser.name.split(',').map((line, i) => <div key={i}>{line}</div>) } <br />
              Customer id: {this.props.proxyUser.customerid} <br />
              Email Confirmation to: {this.props.proxyUser.email}
              </div>
            )
            : this.props.proxyUserMsg ? <div>{this.props.proxyUserMsg}</div> : <div />
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
    proxyUserList: state.proxyUserList,
    proxyUserMsg: state.proxyUserMsg
  }
}

export default connect(mapStateToProps)(DefInfo)
