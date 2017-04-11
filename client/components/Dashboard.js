import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Dashboard = React.createClass({
  componentDidMount () {
    console.log('Dashboard, props:', this.props.orderForm.length)
  },
  handleFormSubmit () {
    console.log('form submitted')
  },
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
            </GridTile>
          ))}
        </GridList>
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
    orderForm: state.orderForm
  }
}

export default connect(mapStateToProps)(Dashboard)
