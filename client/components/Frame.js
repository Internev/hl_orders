import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link, browserHistory } from 'react-router'

class Frame extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidUpdate () {
    console.log('frame updated, props:', this.props)
  }
  render () {
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <IndexLink to='/'>Order Form</IndexLink>
            { this.props.user.admin ? (<Link to='/radmin'>Admin Tools</Link>) : ''}
          </div>

          { this.props.isAuthenticated ? (
              <div className='top-bar-right'>
                <span>Welcome {this.props.user.name}, email: {this.props.user.email}, id: {this.props.user.id}, {this.props.user.admin ? 'true' : 'false'}</span>
                <Link to='/logout'>Log out</Link>
              </div>
            ) : (
              <div className='top-bar-right'>
                <Link to='/login'>Log in</Link>
              </div>
            )
        }

        </div>
        <div>
          { /* child component will be rendered here */ }
          {this.props.children}
        </div>

      </div>
    )
  }
}

Frame.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Frame)
