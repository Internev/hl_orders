import {
  UPLOAD_ORDER_FORM,
  UPLOAD_ORDER_FORM_SUCCESS,
  UPLOAD_ORDER_FORM_FAILURE,
  GET_ORDER_FORM_SUCCESS,
  GET_ORDER_FORM_FAILURE,
  SET_SEARCH_TERM,
  UPDATE_ORDER,
  UPDATE_TOTALS,
  SAVE_ORDER_PROCESSING,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILURE,
  CUSTOMERS_SUCCESS,
  CUSTOMERS_FAILURE,
  UPDATE_ADD_INFO,
  CLEAR_ORDER,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  SET_ORDER_DISPLAY,
  CLEAR_MESSAGE
} from './actions'
import axios from 'axios'

export function clearMessage () {
  return {
    type: CLEAR_MESSAGE
  }
}

export function updateAddInfo (key, value) {
  return {
    type: UPDATE_ADD_INFO,
    key,
    value
  }
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

export function clearOrder () {
  return {
    type: CLEAR_ORDER
  }
}

export function uploadOrderForm (form) {
  return dispatch => {
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.post('/api/order-form', form, config)
      .then(res => {
        // console.log('res from upload of form:', res)
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
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.get('/api/order-form', config)
      .then(res => {
        // console.log('order form retrieval success, data:', res.data)
        return dispatch(getOrderFormSuccess(res.data))
      })
      .catch(err => {
        console.log('get order form error', err)
        if (err) return dispatch(getOrderFormFailure(err))
      })
  }
}

export function getOrderHistory (user) {
  // console.log('getorderhistoryuser:', user)
  const config = {
    headers: {
      'authorization': localStorage.getItem('id_token')
    }
  }
  if (user) config.headers.id = user.id
  // console.log('getorderhistory, user:', user, 'config:', config)
  return dispatch => {
    axios.get('/api/order', config)
      .then(res => {
        // console.log('response from orderhistory:', res)
        dispatch(getOrderHistorySuccess(res.data))
      })
      .catch(err => {
        console.log('history error:', err)
        dispatch(getOrderHistoryFailure(err))
      })
  }
}

function getOrderHistorySuccess (orders) {
  return {
    type: GET_ORDER_HISTORY_SUCCESS,
    orders
  }
}

function getOrderHistoryFailure (err) {
  return {
    type: GET_ORDER_HISTORY_FAILURE,
    err
  }
}

export function setOrderDisplay (order) {
  return {
    type: SET_ORDER_DISPLAY,
    order
  }
}

export function setSearchTerm (searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}

export function updateOrder (sock) {
  return {
    type: UPDATE_ORDER,
    sock
  }
}

export function updateTotals () {
  return {
    type: UPDATE_TOTALS
  }
}

export function saveOrder (order, customer, totalPrice, totalAmt, addinfo, shipping) {
  return dispatch => {
    dispatch(saveOrderProcessing())
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    // const userId = user.id
    // const customerid = user.customerid
    // const email = user.email
    axios.post('/api/order', {order, customer, totalPrice, totalAmt, addinfo, shipping}, config)
    .then(res => {
      console.log('response from saveorder:', res.data)
      dispatch(saveOrderSuccess(res.data))
      dispatch(clearOrder())
    })
    .catch(err => {
      if (err) console.log('error from saveorder:', err)
      if (err) dispatch(saveOrderFailure(err))
    })
  }
}

function saveOrderProcessing () {
  return {
    type: SAVE_ORDER_PROCESSING,
    orderProcessing: true
  }
}

function saveOrderSuccess (data) {
  return {
    type: SAVE_ORDER_SUCCESS,
    orderProcessing: false,
    data
  }
}

function saveOrderFailure (err) {
  return {
    type: SAVE_ORDER_FAILURE,
    orderProcessing: false,
    err
  }
}

export function uploadStoreGeo (data) {
  console.log('store geo, data:', data)
  // return dispatch => {
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.post('/api/store-geo', data, config)
      .then(res => {
        console.log('res from upload of form:', res)
        // return dispatch(uploadOrderFormSuccess(res.data, 'Order Form Saved to Database'))
      })
      .catch(err => {
        if (err) console.log('err from upload of form:', err)
        // if (err) return dispatch(uploadOrderFormFailure(err.response.data))
      })
  // }
}

function uploadCustomersSuccess (data, msg) {
  return {
    type: CUSTOMERS_SUCCESS,
    data,
    msg
  }
}

function uploadCustomersFailure (err) {
  return {
    type: CUSTOMERS_FAILURE,
    err
  }
}

export function uploadCustomers (data) {
  return dispatch => {
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.post('/api/customers', data, config)
      .then(res => {
        console.log('res from customers api:', res)
        return dispatch(uploadCustomersSuccess(res.data, 'Order Form Saved to Database'))
      })
      .catch(err => {
        if (err) console.log('err from customers api:', err)
        if (err) return dispatch(uploadCustomersFailure(err.response.data))
      })
  }
}
