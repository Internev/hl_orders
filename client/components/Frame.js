import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'

class Frame extends React.Component {
  render () {
    return (
      <div>
        <div className='top-bar'>
          { this.props.isAuthenticated ? (
            <div className='top-bar-left'>
              <IndexLink to='/'>Order Form</IndexLink>
              <Link to='/orderhistory'>Order History</Link>

            </div>
        ) : <div />}
          <div className='top-bar-center'><img src='../style/images/hl_logo.png' /></div>
          { this.props.isAuthenticated ? (
            <div className='top-bar-right'>
              <span>Welcome, {this.props.user.name.slice(0, this.props.user.name.indexOf(','))}.</span>
              <Link to='/logout'>Log out</Link>
            </div>
          ) : <div />
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Frame)
