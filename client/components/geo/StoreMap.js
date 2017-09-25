import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import StoreMarker from './StoreMarker'
import config from '../../../config'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getStoreGeo } from '../redux/geoActionCreators'

class StoreMap extends React.Component {
  constructor (props) {
    super(props)
    this.updateStoreSearch = this.updateStoreSearch.bind(this)
    this.handleStoreSearch = this.handleStoreSearch.bind(this)
    this.state = {storeSearch: ''}
  }
  componentDidUpdate () {
    console.log('MAP props', this.props, '\nstate:', this.state)
  }
  updateStoreSearch (e) {
    e.preventDefault()
    this.setState({storeSearch: e.target.value})
  }
  handleStoreSearch () {
    if (this.state.storeSearch.length > 3) {
      this.props.dispatch(getStoreGeo(this.state.storeSearch))
    }
  }
  render () {
    return (
      <div className='store-map'>
        <div>
          Find your closest Humphrey Law retailers<br />
          <TextField
            hintText='Search by postcode or address'
            value={this.state.storeSearch}
            onChange={this.updateStoreSearch}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                this.handleStoreSearch()
              }
            }}
          />&nbsp;
        <RaisedButton
            label='Search'
            onClick={this.handleStoreSearch}
          />
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{key: config.GMAPS_MAP}}
          center={this.props.geo.searchPoint}
          defaultZoom={14}
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
        <div className='store-map-names'>
          {this.props.geo.stores.length > 0
          ? this.props.geo.stores.map((store, i) => (
            <div className='store-map-name' key={i}>
              <div><b>{store.name}</b></div>
               {store.comment ? (<div>({store.comment})</div>) : null}
              <div>{store.address}</div>
            </div>
          ))
          : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geo: state.geo
  }
}

export default connect(mapStateToProps)(StoreMap)
