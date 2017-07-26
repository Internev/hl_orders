import {
  UPLOAD_GEO_PROCESSING,
  UPLOAD_GEO_SUCCESS,
  UPLOAD_GEO_FAILURE
} from './actions'

const DEFAULT_STATE = {
  stores: [],
  failures: [],
  msg: '',
  processing: false
}

const uploadGeoProcessing = (state, action) => {
  const newState = {
    ...state,
    ...{
      processing: true,
      msg: 'Getting geolocations for stores. This can be a slow process!'
    }}
  return newState
}

const uploadGeoSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      failures: action.failures.geoFailures,
      processing: false,
      msg: 'Geolocation complete. Any failed addresses listed below.'
    }}
  return newState
}

const uploadGeoFailure = (state, action) => {
  const newState = {
    ...state,
    ...{
      processing: false,
      msg: action.err
    }}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPLOAD_GEO_PROCESSING:
      return uploadGeoProcessing(state, action)
    case UPLOAD_GEO_SUCCESS:
      return uploadGeoSuccess(state, action)
    case UPLOAD_GEO_FAILURE:
      return uploadGeoFailure(state, action)
    default:
      return state
  }
}
