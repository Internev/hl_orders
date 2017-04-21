import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Sock from './Sock'
import { getOrderForm, setSearchTerm, updateOrder } from './redux/actionCreators'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getOrderForm())
    // console.log('Dashboard, props:', this.props)
  }
  handleFormSubmit (sock, colour, amount, size, index) {
    colour[size] = parseInt(amount)
    sock.colours[index] = colour
    sock.totalAmt = sock.colours.reduce((memo, colour) => {
      memo += colour.smallAmt + colour.regularAmt + colour.kingAmt
      return memo
    }, 0)
    this.props.dispatch(updateOrder(sock))
    console.log(sock)
  }
  handleLiveSearch (e) {
    this.props.dispatch(setSearchTerm(e.target.value))
  }
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>Humphrey Law Order Form</h2>
        <TextField id='filterSocks' onChange={e => this.handleLiveSearch(e)} placeholder='Filter Socks' />
        <GridList cellHeight={'auto'}>
          {this.props.orderForm
            .filter(sock =>
              !this.props.searchTerm
              ? true
              : `${sock.styleID}${sock.desc}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
            .map(sock => (
              <Sock sock={sock} handleFormSubmit={this.handleFormSubmit} key={sock.styleID} />
          ))}
        </GridList>
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
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(Dashboard)
