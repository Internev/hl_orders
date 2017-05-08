import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link, browserHistory } from 'react-router'
// import { Card, CardText } from 'material-ui/Card'
// import {GridList, GridTile} from 'material-ui/GridList'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'

const Frame = React.createClass({
  componentDidUpdate () {
    if (!this.props.isAuthenticated) {
      browserHistory.push('/login')
    }
  },
  render () {
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <IndexLink to='/'>Home</IndexLink>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign up</Link>
            <Link to='/logout'>Log Out</Link>
            <span>Welcome {this.props.user.name}, email: {this.props.user.email}, id: {this.props.user.id}</span>
          </div>

          {// Auth.isUserAuthenticated() ? (
          //   <div className='top-bar-right'>
          //     <Link to='/logout'>Log out</Link>
          //   </div>
          // ) : (
          //   <div className='top-bar-right'>
          //     <Link to='/login'>Log in</Link>
          //     <Link to='/signup'>Sign up</Link>
          //   </div>
          // )
        }

        </div>
        <div>
          { /* child component will be rendered here */ }
          {this.props.children}
        </div>

      </div>
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Frame)
