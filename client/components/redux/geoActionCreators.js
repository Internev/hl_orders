import { UPLOAD_GEO_SUCCESS, UPLOAD_GEO_FAILURE } from './actions'
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
        return dispatch(uploadGeoSuccess(res.data, 'Order Form Saved to Database'))
      })
      .catch(err => {
        if (err) console.log('err from upload of form:', err)
        if (err) return dispatch(uploadGeoFailure(err.response.data))
      })
  }
}

function uploadGeoSuccess () {}

function uploadGeoFailure () {}
