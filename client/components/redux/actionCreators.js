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
  SET_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_FILTER,
  SET_PROXY_USER,
  SET_PROXY_USER_LIST,
  CLOSE_PROXY_USER_LIST,
  PROXY_USER_FAILURE,
  TOGGLE_ADMIN,
  TOGGLE_AGENT,
  CLEAR_PROXY_USER
} from './actions'
import axios from 'axios'

export function clearProxyUser () {
  return {
    type: CLEAR_PROXY_USER
  }
}

export function setMessage (msg) {
  return {
    type: SET_MESSAGE,
    msg
  }
}

export function clearMessage () {
  return {
    type: CLEAR_MESSAGE
  }
}

export function clearFilter () {
  return {
    type: CLEAR_FILTER
  }
}

export function toggleAdmin (proxyUser) {
  return dispatch => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'type': 'admin'
      }
    }
    axios.post('/api/customer', proxyUser, config)
      .then(res => {
        dispatch(toggleProxyAdmin(res.data.user[1]))
      })
      .catch(err => console.log('toggleAdmin error:', err))
  }
}

function toggleProxyAdmin (proxyUser) {
  return {
    type: TOGGLE_ADMIN,
    proxyUser
  }
}

export function toggleAgent (proxyUser) {
  return dispatch => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'type': 'agent'
      }
    }
    axios.post('/api/customer', proxyUser, config)
      .then(res => {
        dispatch(toggleProxyAgent(res.data.user[1]))
      })
      .catch(err => console.log('toggleAdmin error:', err))
  }
}

function toggleProxyAgent (proxyUser) {
  return {
    type: TOGGLE_AGENT,
    proxyUser
  }
}

export function getProxyUser (query) {
  return dispatch => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        query
      }
    }
    axios.get('/api/customers', config)
      .then(res => {
        if (res.data.length === 1) {
          return dispatch(setProxyUser(res.data[0]))
        } else {
          return dispatch(setProxyUserList(res.data))
        }
      })
      .catch(err => {
        // if (err) console.log('err from proxyUser:', err)
        if (err) return dispatch(proxyUserFailure(err))
      })
  }
}

export function setProxyUser (user) {
  return {
    type: SET_PROXY_USER,
    user
  }
}

function setProxyUserList (users) {
  return {
    type: SET_PROXY_USER_LIST,
    users
  }
}

export function closeProxyUserList () {
  return {
    type: CLOSE_PROXY_USER_LIST
  }
}

function proxyUserFailure () {
  return {
    type: PROXY_USER_FAILURE,
    msg: 'Unable to find customer. Please double check the customer number is active and enabled for online ordering.'
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
        return dispatch(getOrderFormSuccess(res.data))
      })
      .catch(err => {
        if (err) return dispatch(getOrderFormFailure(err))
      })
  }
}

export function getOrderHistory (user) {
  const config = {
    headers: {
      'authorization': localStorage.getItem('id_token')
    }
  }
  if (user) config.headers.id = user.customerid
  return dispatch => {
    axios.get('/api/order', config)
      .then(res => {
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

export function saveOrder (order, customer, totalPrice, totalAmt, addinfo, shipping, agent) {
  return dispatch => {
    dispatch(saveOrderProcessing())
    const config = {
      headers: {'authorization': localStorage.getItem('id_token')}
    }
    axios.post('/api/order', {order, customer, totalPrice, totalAmt, addinfo, shipping, agent}, config)
    .then(res => {
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
        return dispatch(uploadCustomersSuccess(res.data, 'Order Form Saved to Database'))
      })
      .catch(err => {
        if (err) console.log('err from customers api:', err)
        if (err) return dispatch(uploadCustomersFailure(err.response.data))
      })
  }
}
