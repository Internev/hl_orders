import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { loginUser } from './redux/authCreators'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentDidUpdate () {
    if (this.props.user.auth.success) {
      browserHistory.push('/')
    }
  }
  handleFormSubmit (e) {
    e.preventDefault()

    const creds = {
      email: this.refs.email.input.value.toLowerCase(),
      password: this.refs.password.input.value
    }
    this.props.dispatch(loginUser(creds))
  }
  render () {
    return (
      <Card className='container'>
        <form action='/' onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Login</h2>

          {this.props.user.auth.message && <p className='success-message'>{this.props.user.auth.message}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              name='email'
              ref='email'
              errorText={this.props.user.auth.errors && this.props.user.auth.errors.email ? this.props.user.auth.errors.email : ''}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              ref='password'
              errorText={this.props.user.auth.errors && this.props.user.auth.errors.password ? this.props.user.auth.errors.password : ''}
            />
          </div>

          <div className='button-line'>
            <RaisedButton type='submit' label='Log in' primary />
          </div>

        </form>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LoginPage)
