import React from 'react'

class StoreMarker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: false,
      popup: false
    }
    this.handleMouseIn = this.handleMouseIn.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleMouseIn () {
    this.setState({hover: true})
  }
  handleMouseOut () {
    this.setState({hover: false})
  }
  handleClick () {
    this.setState({hover: false, popup: !this.state.popup})
  }
  render () {
    return (
      <div style={{position: 'relative'}}>
        <div
          className='store-dot'
          onMouseOver={this.handleMouseIn}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleClick}
          />
        <div
          className='store-info'
          style={{display: this.state.hover ? 'block' : 'none'}}>
          <div>{this.props.store.name}</div>
          <div>{this.props.store.address}</div>
        </div>
        <div
          className='store-info'
          style={{display: this.state.popup ? 'block' : 'none'}}
          onClick={this.handleClick}
          >
          <div>{this.props.store.name}</div>
          <div>{this.props.store.address}</div>
        </div>
      </div>
    )
  }
}

export default StoreMarker
