import {
  UPLOAD_ORDER_FORM,
  UPLOAD_ORDER_FORM_SUCCESS,
  UPLOAD_ORDER_FORM_FAILURE,
  GET_ORDER_FORM_SUCCESS,
  GET_ORDER_FORM_FAILURE,
  SET_SEARCH_TERM
} from './actions'
import axios from 'axios'

const config = {
  headers: {'authorization': localStorage.getItem('id_token')}
}

function uploadOrderFormSuccess (data, msg) {
  return {
    type: UPLOAD_ORDER_FORM_SUCCESS,
    data,
    msg
  }
}

function uploadOrderFormFailure (msg) {
  return {
    type: UPLOAD_ORDER_FORM_FAILURE,
    msg
  }
}

export function uploadOrderForm (form) {
  return dispatch => {
    axios.post('/api/order-form', form, config)
      .then(res => {
        console.log('res from upload of form:', res)
        return dispatch(uploadOrderFormSuccess(res.data, 'Order Form Saved to Database'))
      })
      .catch(err => {
        // if (err) console.log('err from upload of form:', err)
        if (err) return dispatch(uploadOrderFormFailure(err.response.data))
      })
  }
}

function getOrderFormSuccess (data) {
  return {
    type: GET_ORDER_FORM_SUCCESS,
    data
  }
}

function getOrderFormFailure (msg) {
  return {
    type: GET_ORDER_FORM_FAILURE,
    msg
  }
}

export function getOrderForm () {
  return dispatch => {
    axios.get('/api/order-form', config)
      .then(res => {
        console.log('order form retrieval success, data:', res.data)
        return dispatch(getOrderFormSuccess(res.data))
      })
      .catch(err => {
        if (err) return dispatch(getOrderFormFailure(err.response.data))
      })
  }
}

export function setSearchTerm (searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}
