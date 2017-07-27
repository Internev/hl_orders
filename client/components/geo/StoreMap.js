import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import StoreMarker from './StoreMarker'
import config from '../../../config'

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
          <StoreMarker
            key={i}
            lat={store.location.coordinates[1]}
            lng={store.location.coordinates[0]}
            store={store}
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
