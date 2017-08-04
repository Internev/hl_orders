import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Sock from './Sock'
import { getOrderForm, setSearchTerm, updateOrder, updateTotals, clearOrder, clearFilter, clearProxyUser } from './redux/actionCreators'

class OrderForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleFilterClear = this.handleFilterClear.bind(this)
  }
  componentDidMount () {
    if (!this.props.order.form.length) {
      this.props.dispatch(getOrderForm())
    }
  }
  componentDidUpdate () {
    if (!this.props.user.isAuthenticated) {
      browserHistory.push('/logout')
    }
  }
  handleFormSubmit (sock, colour, amount, size, index) {
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
    this.props.dispatch(clearProxyUser())
  }
  handleFilterClear () {
    this.props.dispatch(clearFilter())
  }
  render () {
    return (
      <div>
        <div className={this.props.order.totalAmt ? 'content bottom-bar-padding' : 'content'}>
          <div className='container'>
            <div className='card-heading'>Humphrey Law Order Form</div>
            <div className='filter-input'>
              <div />
              <TextField
                id='filterSocks'
                onChange={e => this.handleLiveSearch(e)}
                placeholder='Filter Socks'
                value={this.props.order.searchTerm}
                style={{flex: '3'}}
              />
              {this.props.order.searchTerm
              ? (<div>&nbsp;<RaisedButton
                label='Remove Filter'
                onClick={this.handleFilterClear}
                /></div>)
              : <div />}
            </div>
            { this.props.order.form.length > 0
            ? <div className='sock-container'>
              {this.props.order.form
                .filter(sock =>
                  !this.props.order.searchTerm
                  ? true
                  : `${sock.styleID}${sock.desc}`.toUpperCase().indexOf(this.props.order.searchTerm.toUpperCase()) >= 0)
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

        {this.props.order.totalAmt
          ? <div className='bottom-bar'>
            <div className='bottom-bar-left'>
              <div className='bottom-bar-summary'>{this.props.order.totalAmt} Pair{this.props.order.totalAmt > 1 ? 's' : ''} in Order. Total Price: ${this.props.order.totalPrice.toFixed(2)} exGST</div>
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
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderForm)
