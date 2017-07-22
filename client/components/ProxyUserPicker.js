import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import { setProxyUser, closeProxyUserList } from './redux/actionCreators'

class ProxyUserPicker extends React.Component {
  constructor (props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleUserProxyListClick = this.handleUserProxyListClick.bind(this)
  }
  handleClose () {
    this.props.dispatch(closeProxyUserList())
  }
  handleUserProxyListClick (user) {
    this.props.dispatch(setProxyUser(user))
    this.handleClose()
  }
  render () {
    return (
      <div>
        <Dialog
          title='Please Select a User'
          modal={false}
          open={this.props.proxyUserListOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <table className='order-history'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Customer Code</th>
              </tr>
              {this.props.proxyUserList.length > 1
                          ? this.props.proxyUserList.map(user => (
                            <tr
                              className='pointer'
                              key={user.id}
                              onClick={e => {
                                e.preventDefault()
                                this.handleUserProxyListClick(user)
                              }}
                              >
                              <td>{user.name.slice(0, user.name.indexOf(','))}</td>
                              <td>{user.email}</td>
                              <td>{user.customerid}</td>
                            </tr>
                        ))
                        : <div />
                      }
            </tbody>
          </table>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    proxyUser: state.proxyUser,
    proxyUserList: state.proxyUserList,
    proxyUserListOpen: state.proxyUserListOpen
  }
}

export default connect(mapStateToProps)(ProxyUserPicker)
