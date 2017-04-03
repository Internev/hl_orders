import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { loginUser } from './redux/authCreators'

const SignUpPage = React.createClass({
  handleFormSubmit (e) {
    e.preventDefault()

    console.log('form submitted')
  },
  render () {
    return (
      <Card className='container'>
        <form action='/' onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Login</h2>

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              name='email'
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
            />
          </div>

          <div className='button-line'>
            <RaisedButton type='submit' label='Log in' primary />
          </div>

          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    activeFeed: state.activeFeed
  }
}

export default connect(mapStateToProps)(SignUpPage)
