import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { signupUser } from './redux/authCreators'

class SignUpPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentDidUpdate () {
    if (this.props.user.auth.success) {
      this.props.dispatch({type: 'SIGNUP_REDIRECT'})
      browserHistory.push('/login')
    }
  }
  handleFormSubmit (e) {
    e.preventDefault()

    const creds = {
      name: this.refs.name.input.value,
      email: this.refs.email.input.value,
      password: this.refs.password.input.value
    }
    this.props.dispatch(signupUser(creds))
  }
  render () {
    return (
      <Card className='container'>
        <form onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Signup</h2>

          {!this.props.user.auth.success && <p className='error-message'>{this.props.user.auth.message}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Name'
              name='name'
              ref='name'
              errorText={this.props.user.auth.errors.name}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              type='email'
              name='email'
              ref='email'
              errorText={this.props.user.auth.errors.email}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              ref='password'
              errorText={this.props.user.auth.errors.password}
            />
          </div>

          <div className='button-line'>
            <RaisedButton type='submit' label='Sign Up' primary />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log In</Link>.</CardText>
        </form>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
    // isFetching: state.isFetching,
    // isAuthenticated: state.isAuthenticated,
    // auth: state.auth
  }
}

export default connect(mapStateToProps)(SignUpPage)
