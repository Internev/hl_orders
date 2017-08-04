import {
  UPLOAD_ORDER_FORM_SUCCESS,
  UPLOAD_ORDER_FORM_FAILURE,
  GET_ORDER_FORM_SUCCESS,
  GET_ORDER_FORM_FAILURE,
  SET_SEARCH_TERM,
  UPDATE_ORDER,
  UPDATE_TOTALS,
  CLEAR_ORDER,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  SET_ORDER_DISPLAY,
  SAVE_ORDER_PROCESSING,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILURE,
  UPDATE_ADD_INFO,
  CLEAR_FILTER
} from './actions'

const DEFAULT_STATE = {
  addinfo: {},
  form: [],
  totalAmt: 0,
  totalPrice: 0,
  processing: false,
  complete: false,
  display: [],
  history: [],
  msg: '',
  searchTerm: ''
}

const uploadOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{form: action.data.storedorder, msg: action.msg}}
  return newState
}

const uploadOrderFormFailure = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const getOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{form: action.data.storedorder}}
  return newState
}

const getOrderFormFailure = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const setSearchTerm = (state, action) => {
  const newState = {...state, ...{searchTerm: action.searchTerm}}
  return newState
}

const updateOrder = (state, action) => {
  let orderFormUpdate = [...state.form]
  const index = orderFormUpdate.reduce((memo, item, index) => {
    if (item.styleID === action.sock.styleID) memo = index
    return memo
  }, -1)
  orderFormUpdate[index] = action.sock
  const newState = {...state, ...{form: orderFormUpdate}}
  return newState
}

const updateTotals = (state, action) => {
  let orderFormUpdate = [...state.form]
  let newAmt = 0
  let newPrice = 0
  orderFormUpdate.forEach(sock => {
    newAmt += sock.totalAmt ? sock.totalAmt : 0
    newPrice += sock.totalAmt ? (sock.totalAmt * sock.price) : 0
  })
  const newState = {
    ...state,
    ...{totalAmt: newAmt, totalPrice: newPrice}}
  return newState
}

const clearOrder = (state, action) => {
  let orderFormUpdate = state.form.map(sock => {
    sock.totalAmt = 0
    sock.colours.forEach(colour => {
      sock.sizes.forEach(size => {
        colour[size] = 0
      })
    })
    return sock
  })
  const newState = {
    ...state,
    ...{
      form: [...orderFormUpdate],
      totalAmt: 0,
      totalPrice: 0,
      searchTerm: '',
      addinfo: {},
      complete: false,
      msg: ''
    }}
  return newState
}

// const clearComplete = (state, action) => {
//   const newState = {...state, ...{orderComplete: false, addinfo: {}, proxyUserMsg: ''}}
//   return newState
// }

const saveOrderProcessing = (state, action) => {
  const newState = {
    ...state,
    ...{
      processing: true,
      complete: false
    }
  }
  return newState
}

const saveOrderSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      msg: action.data.message,
      display: action.data.order,
      processing: false,
      complete: true
    }
  }
  return newState
}

const saveOrderFailure = (state, action) => {
  const newState = {
    ...state,
    ...{
      msg: action.err.message,
      processing: false,
      complete: false
    }
  }
  return newState
}

const getOrderHistorySuccess = (state, action) => {
  const newState = {
    ...state,
    ...{history: action.orders}
  }
  return newState
}

const getOrderHistoryFailure = (state, action) => {
  const newState = {
    ...state,
    ...{msg: action.err.message}
  }
  return newState
}

const setOrderDisplay = (state, action) => {
  const newState = {
    ...state,
    ...{display: action.order}
  }
  return newState
}

const updateAddInfo = (state, action) => {
  let newAddinfo = state.addinfo
  let key = action.key
  let value = action.value
  newAddinfo = {...newAddinfo, ...{[key]: value}}
  const newState = {...state, ...{addinfo: newAddinfo}}
  return newState
}

const clearFilter = (state, action) => {
  const newState = {...state, ...{searchTerm: ''}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPLOAD_ORDER_FORM_SUCCESS:
      return uploadOrderFormSuccess(state, action)
    case UPLOAD_ORDER_FORM_FAILURE:
      return uploadOrderFormFailure(state, action)
    case GET_ORDER_FORM_SUCCESS:
      return getOrderFormSuccess(state, action)
    case GET_ORDER_FORM_FAILURE:
      return getOrderFormFailure(state, action)
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action)
    case UPDATE_ORDER:
      return updateOrder(state, action)
    case UPDATE_TOTALS:
      return updateTotals(state, action)
    case SAVE_ORDER_PROCESSING:
      return saveOrderProcessing(state, action)
    case SAVE_ORDER_SUCCESS:
      return saveOrderSuccess(state, action)
    case SAVE_ORDER_FAILURE:
      return saveOrderFailure(state, action)
    case CLEAR_ORDER:
      return clearOrder(state, action)
    case GET_ORDER_HISTORY_SUCCESS:
      return getOrderHistorySuccess(state, action)
    case GET_ORDER_HISTORY_FAILURE:
      return getOrderHistoryFailure(state, action)
    case SET_ORDER_DISPLAY:
      return setOrderDisplay(state, action)
    case UPDATE_ADD_INFO:
      return updateAddInfo(state, action)
    case CLEAR_FILTER:
      return clearFilter(state, action)
    default:
      return state
  }
}
