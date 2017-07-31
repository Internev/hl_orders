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
      background: 'black',
      width: '18px',
      height: '18px',
      borderRadius: '12px',
      border: '2px solid orange',
      cursor: 'pointer',
      zIndex: 1
    }

    const infoPopStyle = {
      width: '125px',
      height: '70px',
      background: 'black',
      border: '2px solid orange',
      position: 'absolute',
      top: '-72px',
      fontSize: '0.88em',
      color: 'white',
      display: this.state.hover ? 'block' : 'none',
      zIndex: 1000
    }
    return (
      <div style={{position: 'relative'}}>
        <div
          style={storeDotStyle}
          onMouseOver={this.handleMouseIn}
          onMouseOut={this.handleMouseOut}
          />
        <div style={infoPopStyle}>
          <div>{this.props.store.name}</div>
          <div>{this.props.store.address}</div>
        </div>
      </div>
    )
  }
}


export default StoreMarker
