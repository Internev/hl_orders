import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import {grey600} from 'material-ui/styles/colors'

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.menuToggle = this.menuToggle.bind(this)
  }
  menuToggle () {
    let menuEl = document.querySelector('.menu-narrow')
    if (menuEl.style.display === 'block') {
      menuEl.style.display = 'none'
    } else {
      menuEl.style.display = 'block'
    }
  }
  render () {
    return (
      <nav>
        <div className='navbar-wide'>
          { this.props.isAuthenticated ? (
            <div className='navbar-wide-left'>
              <IndexLink to='/'>Order Form</IndexLink> |&nbsp;
              <Link to='/orderhistory'>Order History</Link>
              {this.props.user.admin ? ' |' : ''}
              {this.props.user.admin
              ? <Link to='/radmin'> Admin Tools</Link>
              : null}
            </div>
          )
          : <div />}
          <div><img src='../style/images/hl_logo.png' /></div>
          { this.props.isAuthenticated ? (
            <div className='navbar-wide-right'>
              <span>Welcome, {this.props.user.name.slice(0, this.props.user.name.indexOf(','))}.&nbsp;</span>
              <Link to='/logout'>Log out</Link>
            </div>
          )
          : <div />}
        </div>
        <div className='navbar-narrow'>
          <MenuIcon
            onClick={this.menuToggle}
            style={{
              float: 'right',
              height: 48,
              width: 48,
              cursor: 'pointer'
            }}
            color={grey600}
            />
          <div><img src='../style/images/hl_logo.png' /></div>
          { this.props.isAuthenticated ? (
            <div className='menu-narrow'>
              <span>Welcome, {this.props.user.name.slice(0, this.props.user.name.indexOf(','))}.</span>
              <IndexLink to='/' onClick={this.menuToggle}>Order Form</IndexLink>
              <Link to='/orderhistory' onClick={this.menuToggle}>Order History</Link>
              {this.props.user.admin
              ? <Link to='/radmin' onClick={this.menuToggle}>Admin Tools</Link>
              : null}
              <Link to='/logout' onClick={this.menuToggle}>Log out</Link>
            </div>
          )
          : <div />}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Navigation)
