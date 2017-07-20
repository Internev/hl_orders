import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { Card } from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// import Backspace from 'material-ui/svg-icons/content/backspace'
// import {grey400, amber400} from 'material-ui/styles/colors'
import Sock from './Sock'
import { getOrderForm, setSearchTerm, updateOrder, updateTotals, clearOrder, clearFilter } from './redux/actionCreators'

class OrderForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleFilterClear = this.handleFilterClear.bind(this)
  }
  componentDidMount () {
    if (!this.props.orderForm.length) {
      this.props.dispatch(getOrderForm())
    }
  }
  componentDidUpdate () {
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
    // console.log('OrderForm, props:', this.props)
  }
  handleFormSubmit (sock, colour, amount, size, index) {
    // console.log('sock size updated, sock:', sock, '\ncolour:', colour, '\namount:', amount, '\nsize:', size, '\nindex:', index)
    colour[size] = parseInt(amount) || 0
    sock.colours[index] = colour
    sock.totalAmt = sock.colours.reduce((memo, colour) => {
      sock.sizes.forEach(size => {
        if (colour.hasOwnProperty(size)) memo += colour[size]
      })
      return memo
    }, 0)
    this.props.dispatch(updateOrder(sock))
    this.props.dispatch(updateTotals())
  }
  handleLiveSearch (e) {
    this.props.dispatch(setSearchTerm(e.target.value))
  }
  handleOrderSubmit () {
    browserHistory.push('/confirm')
  }
  handleClear () {
    this.props.dispatch(clearOrder())
  }
  handleFilterClear () {
    this.props.dispatch(clearFilter())
  }
  render () {
    return (
      <div>
        <div className={this.props.orderTotalAmt ? 'content bottom-bar-padding' : 'content'}>
          <div className='container'>
            <div className='card-heading'>Humphrey Law Order Form</div>
            <div className='filter-input'>
              <div />
              <TextField
                id='filterSocks'
                onChange={e => this.handleLiveSearch(e)}
                placeholder='Filter Socks'
                value={this.props.searchTerm}
                style={{flex: '3'}}
              />
              {this.props.searchTerm
              ? (<div>&nbsp;<RaisedButton
                label='Remove Filter'
                onClick={this.handleFilterClear}
                /></div>)
              : <div />}
            </div>
            { this.props.orderForm.length > 0
            ? <div className='sock-container'>
              {this.props.orderForm
                .filter(sock =>
                  !this.props.searchTerm
                  ? true
                  : `${sock.styleID}${sock.desc}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
                .map(sock => (
                  <Sock
                    sock={sock}
                    handleFormSubmit={this.handleFormSubmit}
                    key={sock.styleID}
                  />)
                )}
            </div>
            : <div /> }
          </div>
        </div>

        {this.props.orderTotalAmt
          ? <div className='bottom-bar'>
            <div className='bottom-bar-left'>
              <div className='bottom-bar-summary'>{this.props.orderTotalAmt} Pair{this.props.orderTotalAmt > 1 ? 's' : ''} in Order. Total Price: ${this.props.orderTotalPrice.toFixed(2)} exGST</div>
            </div>
            <div className='bottom-bar-right'>
              <RaisedButton
                label='Clear'
                onClick={this.handleClear}
                />&nbsp;
              <RaisedButton
                label='Submit Order'
                onClick={this.handleOrderSubmit}
                />
            </div>
          </div>
          : <div />
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
    orderForm: state.orderForm,
    searchTerm: state.searchTerm,
    orderTotalAmt: state.orderTotalAmt,
    orderTotalPrice: state.orderTotalPrice
  }
}

export default connect(mapStateToProps)(OrderForm)
