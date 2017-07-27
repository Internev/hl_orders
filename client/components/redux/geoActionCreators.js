import {
  UPLOAD_GEO_SUCCESS,
  UPLOAD_GEO_FAILURE,
  UPLOAD_GEO_PROCESSING,
  GET_STORE_GEO_SUCCESS,
  GET_STORE_GEO_FAILURE
} from './actions'
import axios from 'axios'

export function uploadStoreGeo (data) {
  // console.log('store geo, data:', data)
  return dispatch => {
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.post('/api/store-geo', data, config)
      .then(res => {
        console.log('res from upload of form:', res)
        return dispatch(uploadGeoSuccess(res.data, 'Geocoding complete.'))
      })
      .catch(err => {
        if (err) console.log('err from upload of form:', err)
        if (err && err.response) return dispatch(uploadGeoFailure(err.response))
      })
  }
}

export function uploadGeoProcessing () {
  return {
    type: UPLOAD_GEO_PROCESSING
  }
}

function uploadGeoSuccess (failures, msg) {
  return {
    type: UPLOAD_GEO_SUCCESS,
    failures,
    msg
  }
}

function uploadGeoFailure (err) {
  return {
    type: UPLOAD_GEO_FAILURE,
    err
  }
}

export function getStoreGeo () {
  return dispatch => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.get('/api/store-geo', config)
      .then(res => {
        // console.log('storegeores:', res)
        return dispatch(getStoreGeoSuccess(res.data))
      })
      .catch(err => {
        console.log('storegeo error:', err)
      })
    }
}

function getStoreGeoSuccess (stores) {
  return {
    type: GET_STORE_GEO_SUCCESS,
    stores
  }
}
