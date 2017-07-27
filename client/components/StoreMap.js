import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import config from '../../config'

const AnyReactComponent = ({ text }) =>  {
  // console.log("component, text", text)
  return (<div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,
  }}>{text}</div>)}

class StoreMap extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    // console.log('MAP')
  }
  render () {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: config.GMAPS_MAP}}
        defaultCenter={{lat: -37.813627, lng: 144.963057}}
        defaultZoom={13}
      >
        {this.props.geo.stores.length > 0
        ? this.props.geo.stores.map((store, i) => (
          <AnyReactComponent
            key={i}
            lat={store.location.coordinates[1]}
            lng={store.location.coordinates[0]}
            text={store.name}
          />
        ))
        : null}
      </GoogleMapReact>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geo: state.geo
  }
}

export default connect(mapStateToProps)(StoreMap)
