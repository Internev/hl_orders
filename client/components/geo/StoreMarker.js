import React from 'react'

class StoreMarker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hover: false}
    this.handleMouseIn = this.handleMouseIn.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }
  handleMouseIn () {
    this.setState({hover: true})
  }
  handleMouseOut () {
    this.setState({hover: false})
  }
  render () {
    const storeDotStyle = {
      backgroundImage: 'url("./style/images/hl_icon2.png")',
      backgroundRepeat: 'no-repeat',
      width: '22px',
      height: '22px',
      borderRadius: '16px',
      border: '1px solid rgb(230, 157, 50)',
      cursor: 'pointer',
      zIndex: 1
    }

    const infoPopStyle = {
      width: '125px',
      height: '60px',
      background: 'white',
      border: '1px solid rgb(230, 157, 50)',
      position: 'absolute',
      top: '-60px',
      left: '10px',
      fontSize: '0.92em',
      color: 'black',
      display: this.state.hover ? 'block' : 'none',
      zIndex: 1000
    }
    return (
      <div style={{position: 'relative'}}>
        <div
          className='store-dot'
          onMouseOver={this.handleMouseIn}
          onMouseOut={this.handleMouseOut}
          />
        <div
          className='store-info'
          style={{display: this.state.hover ? 'block' : 'none'}}>
          <div>{this.props.store.name}</div>
          <div>{this.props.store.address}</div>
        </div>
      </div>
    )
  }
}


export default StoreMarker
