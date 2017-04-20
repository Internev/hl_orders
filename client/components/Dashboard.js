import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getOrderForm, setSearchTerm, updateOrder } from './redux/actionCreators'

class Dashboard extends React.Component {
  componentDidMount () {
    this.props.dispatch(getOrderForm())
    console.log('Dashboard, props:', this.props)
  }
  handleFormSubmit (sock, colour, amount, size, index) {
    colour[size] = parseInt(amount)
    sock[index] = colour
    this.props.dispatch(updateOrder(sock))
    console.log('form submitted sock is:', sock, '\ncolor:', colour, '\namount:', amount, '\nsize:', size)
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
              <GridTile key={sock.styleID} className='sock-tile'>
                <h3>
                  {sock.styleID}
                </h3>
                <div>
                  {sock.desc}
                </div>
                <form>
                  <table>
                    <tbody>
                      <tr>
                        <th>Colour ID</th>
                        <th>Colour Name</th>
                        <th>Pattern</th>
                        <th>Small</th>
                        <th>Reg</th>
                        <th>King</th>
                      </tr>
                      {sock.colours.map((colour, index) => (
                        <tr key={index}>
                          <td>{colour.colourID}</td>
                          <td>{colour.colourName}</td>
                          {colour.patternName !== 'NONE'
                            ? <td>{colour.patternID} - {colour.patternName}</td> : <td />}
                          {colour.small
                            ? <td><input
                              className='order-input'
                              type='number'
                              value={colour.smallAmt === 0 ? '' : colour.smallAmt}
                              onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'smallAmt', index)}
                            /></td>
                            : <td />}
                          {colour.regular
                            ? <td><input
                              className='order-input'
                              type='number'
                              value={colour.regularAmt === 0 ? '' : colour.regularAmt}
                              onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'regularAmt', index)}
                            /></td>
                            : <td />}
                          {colour.king
                            ? <td><input
                              className='order-input'
                              type='number'
                              value={colour.kingAmt === 0 ? '' : colour.kingAmt}
                              onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'kingAmt', index)}
                            /></td>
                            : <td />}
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </form>
              </GridTile>
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
