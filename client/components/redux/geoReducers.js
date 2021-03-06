import {
  UPLOAD_GEO_PROCESSING,
  UPLOAD_GEO_SUCCESS,
  UPLOAD_GEO_FAILURE,
  GET_STORE_GEO_SUCCESS,
  SET_GEO_FOCUS
} from './actions'

const DEFAULT_STATE = {
  stores: [],
  failures: [],
  focusPoint: {lat: -37.8291163, lng: 145.2559383},
  msg: '',
  processing: false
}

const uploadGeoProcessing = (state, action) => {
  const newState = {
    ...state,
    ...{
      processing: true,
      msg: 'Uploading store location data.'
    }}
  return newState
}

const uploadGeoSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      failures: action.failures.geoFailures,
      processing: false,
      msg: 'Store locations written to database.'
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

const getStoreGeoSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      stores: action.stores,
      focusPoint: action.focusPoint
    }
  }
  return newState
}

const setGeoFocus = (state, action) => {
  const newState = {...state, ...{focusPoint: action.focusPoint}}
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
    case GET_STORE_GEO_SUCCESS:
      return getStoreGeoSuccess(state, action)
    case SET_GEO_FOCUS:
      return setGeoFocus(state, action)
    default:
      return state
  }
}
