import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Sock from './Sock'
import { getOrderForm, setSearchTerm, updateOrder, updateTotals } from './redux/actionCreators'

class OrderForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
  }
  componentDidMount () {
    if (!this.props.orderForm.length) {
      this.props.dispatch(getOrderForm())
    }
    // console.log('OrderForm, props:', this.props)
  }
  componentDidUpdate () {
    if (!this.props.isAuthenticated) {
      browserHistory.push('/logout')
    }
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
  render () {
    return (
      <div>
        <div className={this.props.orderTotalAmt ? 'content bottom-bar-padding' : 'content'}>
          <Card className='container'>
            <h2 className='card-heading'>Humphrey Law Order Form</h2>
            <TextField
              id='filterSocks'
              onChange={e => this.handleLiveSearch(e)}
              placeholder='Filter Socks'
              value={this.props.searchTerm}
              />
            { this.props.orderForm.length > 0
            ? <GridList cellHeight={'auto'}>
              {this.props.orderForm
                .filter(sock =>
                  !this.props.searchTerm
                  ? true
                  : `${sock.styleID}${sock.desc}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
                .map(sock => (<Sock sock={sock} handleFormSubmit={this.handleFormSubmit} key={sock.styleID} />)
                )}
            </GridList>
            : <div /> }
          </Card>
        </div>

        {this.props.orderTotalAmt
          ? <div className='bottom-bar'>
            <div className='bottom-bar-left'>
              <h2>{this.props.orderTotalAmt} Socks in Order. Total Price: ${this.props.orderTotalPrice.toFixed(2)} exGST</h2>
            </div>
            <div className='bottom-bar-right'>
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
