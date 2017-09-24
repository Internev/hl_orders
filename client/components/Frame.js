import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import Navigation from './Navigation'

class Frame extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    console.log('rendering frame', this.props.location.pathname)
    return (
      <div>
        {this.props.location.pathname === '/map' ? null : <Navigation />}
        <div>
          { /* child component will be rendered here */ }
          {this.props.children}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
    // isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Frame)
