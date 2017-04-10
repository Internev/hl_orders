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
  uploadCustomerList (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      console.log('upload csv, file:', file.target)

      // this.props.dispatch(importFeeds(OPMLParse(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
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
            <input
              type='file'
              accept='.csv'
              id='customerInput'
              ref={ref => this.customerInput = ref}
              style={{display: 'none'}}
              onChange={this.uploadCustomerList}
            />
            <RaisedButton
              label='Upload Customer List'
              onClick={e => {
                setTimeout(() => {
                  this.customerInput.click()
                }, 200)
              }}
            />
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
