import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getOrderForm } from './redux/actionCreators'

class Dashboard extends React.Component {
  componentDidMount () {
    this.props.dispatch(getOrderForm())
    console.log('Dashboard, props:', this.props.orderForm.length)
  }
  handleFormSubmit (sock, colour, amount) {
    console.log('form submitted sock is:', sock, '\n', colour, '\n', amount)
  }
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>Dashboard</h2>
        <GridList cellHeight={180}>
          {this.props.orderForm.map(sock => (
            <GridTile key={sock.styleID}>
              <div>
                {sock.styleID}
              </div>
              <div>
                {sock.desc}
              </div>
              {sock.colours.map(colour => (
                <form>
                  <div>{colour.colourID} - {colour.colourName}: <input type='number' onChange={(e) => this.handleFormSubmit(sock, colour, e.target.value)} /></div>
                  {colour.patternName !== 'NONE' ? <div>{colour.patternID} - {colour.patternName}</div> : ''}
                </form>
              ))}
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
    orderForm: state.orderForm
  }
}

export default connect(mapStateToProps)(Dashboard)
