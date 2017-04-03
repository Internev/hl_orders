import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { signupUser } from './redux/authCreators'

const SignUpPage = React.createClass({
  componentDidUpdate () {
    console.log('Signup component updated, props:', this.props)
  },
  handleFormSubmit (e) {
    e.preventDefault()

    const creds = {
      name: this.refs.name.input.value,
      email: this.refs.email.input.value,
      password: this.refs.password.input.value
    }
    this.props.dispatch(signupUser(creds))
  },
  render () {
    return (
      <Card className='container'>
        <form onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Signup</h2>

        {!this.props.authErrors.success && <p className='error-message'>{!this.props.authErrors.message}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Name'
              name='name'
              ref='name'
              errorText={this.props.authErrors.errors.name}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              type='email'
              name='email'
              ref='email'
              errorText={this.props.authErrors.errors.email}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              ref='password'
              errorText={this.props.authErrors.errors.password}
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
    user: state.user,
    isFetching: state.isFetching,
    isAuthenticated: state.isAuthenticated,
    authErrors: state.authErrors
  }
}

export default connect(mapStateToProps)(SignUpPage)
