import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { loginUser } from './redux/authCreators'

const SignUpPage = React.createClass({
  componentDidUpdate () {
    if (this.props.auth.success) {
      browserHistory.push('/')
    }
  },
  handleFormSubmit (e) {
    e.preventDefault()

    const creds = {
      email: this.refs.email.input.value,
      password: this.refs.password.input.value
    }
    this.props.dispatch(loginUser(creds))
  },
  render () {
    return (
      <Card className='container'>
        <form action='/' onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Login</h2>

          {this.props.auth.message && <p className='success-message'>{this.props.auth.message}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              name='email'
              ref='email'
              errorText={this.props.auth.errors.email}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              ref='password'
              errorText={this.props.auth.errors.password}
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
    auth: state.auth
  }
}

export default connect(mapStateToProps)(SignUpPage)
