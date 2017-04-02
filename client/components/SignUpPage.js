import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const SignUpPage = React.createClass({
  handleFormSubmit (e) {
    e.preventDefault()

    

    console.log('form submitted, name:', this.refs.name.input.value, '\nemail:', this.refs.email.input.value, '\npassword:', this.refs.password.input.value)
  },
  render () {
    return (
      <Card className='container'>
        <form onSubmit={this.handleFormSubmit}>
          <h2 className='card-heading'>Signup</h2>

          <div className='field-line'>
            <TextField
              floatingLabelText='Name'
              name='name'
              ref='name'
              errorText={this.props.user.errors.name}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              type='email'
              name='email'
              ref='email'
              errorText={this.props.user.errors.email}
            />
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              ref='password'
              errorText={this.props.user.errors.password}
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
    user: state.user
  }
}

export default connect(mapStateToProps)(SignUpPage)
