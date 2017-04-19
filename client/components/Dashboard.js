import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getOrderForm, setSearchTerm } from './redux/actionCreators'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.dispatch(getOrderForm())
    console.log('Dashboard, props:', this.props)
  }
  handleFormSubmit (sock, colour, amount) {
    console.log('form submitted sock is:', sock, '\n', colour, '\n', amount)
    console.log('this is:', this)
  }
  handleLiveSearch (e) {
    this.props.dispatch(setSearchTerm(e.target.value))
  }
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>Humphrey Law Order Form</h2>
        <TextField onChange={e => this.handleLiveSearch(e)} placeholder='Filter Socks' />
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
                      {sock.colours.map(colour => (
                        <tr>
                          <td>{colour.colourID}</td>
                          <td>{colour.colourName}</td>
                          {colour.patternName !== 'NONE'
                            ? <td>{colour.patternID} - {colour.patternName}</td> : <td />}
                          {colour.small
                            ? <td><input className='order-input' type='number' onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'small')} /></td>
                            : <td />}
                          {colour.regular
                            ? <td><input className='order-input' type='number' onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'regular')} /></td>
                            : <td />}
                          {colour.king
                            ? <td><input className='order-input' type='number' onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value, 'king')} /></td>
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
