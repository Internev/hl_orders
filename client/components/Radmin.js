import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Radmin = React.createClass({
  componentDidUpdate () {
    console.log('Radmin, props:', this.props)
  },
  handleFormSubmit () {
    console.log('form submitted')
  },
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>HL Orders Admin</h2>
        <CardText>
          <div>
            <h3>Recent Orders</h3>
          </div>
          <CardActions>
            <RaisedButton label='Upload Customer List' />
            <RaisedButton label='Upload Order Form' />
          </CardActions>

        </CardText>
      </Card>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    id_token: state.id_token,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Radmin)
