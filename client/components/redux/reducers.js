import { SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REDIRECT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
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
  GET_ORDER_HISTORY_FAILURE
} from './actions'

const DEFAULT_STATE = {
  user: {
    id: null,
    name: '',
    email: '',
    admin: false
  },
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') !== null,
  id_token: '',
  auth: {
    success: false,
    message: '',
    errors: {}
  },
  addinfo: {},
  orderForm: [],
  orderTotalAmt: 0,
  orderTotalPrice: 0,
  orderProcessing: false,
  orderComplete: false,
  orderDisplay: [],
  orderHistory: [],
  msg: '',
  searchTerm: ''
}

const updateAddInfo = (state, action) => {
  let newAddinfo = state.addinfo
  let key = action.key
  let value = action.value
  newAddinfo = {...newAddinfo, ...{[key]: value}}
  const newState = {...state, ...{addinfo: newAddinfo}}
  return newState
}

const uploadOrderForm = (state, action) => {
  console.log('uploadOrderForm action:', action)
}

const uploadOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{orderForm: action.data.storedorder, msg: action.msg}}
  return newState
}

const uploadOrderFormFailure = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const getOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{orderForm: action.data.storedorder}}
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
  let orderFormUpdate = [...state.orderForm]
  const index = orderFormUpdate.reduce((memo, item, index) => {
    if (item.styleID === action.sock.styleID) memo = index
    return memo
  }, -1)
  orderFormUpdate[index] = action.sock
  const newState = {...state, ...{orderForm: orderFormUpdate}}
  return newState
}

const updateTotals = (state, action) => {
  let orderFormUpdate = [...state.orderForm]
  let newAmt = 0
  let newPrice = 0
  orderFormUpdate.forEach(sock => {
    newAmt += sock.totalAmt ? sock.totalAmt : 0
    newPrice += sock.totalAmt ? (sock.totalAmt * sock.price) : 0
  })
  const newState = {
    ...state,
    ...{orderTotalAmt: newAmt, orderTotalPrice: newPrice}}
  return newState
}

const clearOrder = (state, action) => {
  let orderFormUpdate = state.orderForm.map(sock => {
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
      orderForm: [...orderFormUpdate],
      orderTotalAmt: 0,
      orderTotalPrice: 0,
      searchTerm: ''
    }}
  return newState
}

const saveOrderProcessing = (state, action) => {
  const newState = {
    ...state,
    ...{
      orderProcessing: true,
      orderComplete: false
    }
  }
  return newState
}

const saveOrderSuccess = (state, action) => {

  const newState = {
    ...state,
    ...{
      msg: action.data.message,
      orderDisplay: action.data.order,
      orderProcessing: false,
      orderComplete: true
    }
  }
  return newState
}

const saveOrderFailure = (state, action) => {
  const newState = {
    ...state,
    ...{
      msg: action.err.message,
      orderProcessing: false,
      orderComplete: false
    }
  }
  return newState
}

const customersSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{msg: action.data.message}
  }
  return newState
}

const customersFailure = (state, action) => {
  const newState = {
    ...state,
    ...{msg: action.err.message}
  }
  return newState
}

const getOrderHistorySuccess = (state, action) => {
  const newState = {
    ...state,
    ...{orderHistory: action.orders}
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

// ************************
// Authentication Start
// ************************

const signupRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const signupError = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: action.msg
  }
  const newState = {...state, ...update}
  return newState
}

const signupSuccess = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: {...action.msg, errors: {}}
  }
  const newState = {...state, ...update}
  return newState
}

const signupRedirect = (state, action) => {
  const newState = {...state, success: false}
  return newState
}

const loginRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const loginError = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: action.data
  }
  const newState = {...state, ...update}
  return newState
}

const loginSuccess = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    user: action.data.user,
    id_token: action.data.token,
    auth: {success: action.data.success, errors: {}}
  }
  const newState = {...state, ...update}
  return newState
}

const logoutRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const logoutSuccess = (state, action) => {
  const newState = {...DEFAULT_STATE, ...{isAuthenticated: false}}
  return newState
}

// ************************
// Authentication End
// ************************

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return signupRequest(state, action)
    case SIGNUP_FAILURE:
      return signupError(state, action)
    case SIGNUP_SUCCESS:
      return signupSuccess(state, action)
    case SIGNUP_REDIRECT:
      return signupRedirect(state, action)
    case LOGIN_REQUEST:
      return loginRequest(state, action)
    case LOGIN_FAILURE:
      return loginError(state, action)
    case LOGIN_SUCCESS:
      return loginSuccess(state, action)
    case LOGOUT_REQUEST:
      return logoutRequest(state, action)
    case LOGOUT_SUCCESS:
      return logoutSuccess(state, action)
    case UPLOAD_ORDER_FORM:
      return uploadOrderForm(state, action)
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
    case CUSTOMERS_SUCCESS:
      return customersSuccess(state, action)
    case CUSTOMERS_FAILURE:
      return customersFailure(state, action)
    case UPDATE_ADD_INFO:
      return updateAddInfo(state, action)
    case CLEAR_ORDER:
      return clearOrder(state, action)
    case GET_ORDER_HISTORY_SUCCESS:
      return getOrderHistorySuccess(state, action)
    case GET_ORDER_HISTORY_FAILURE:
      return getOrderHistoryFailure(state, action)
    default:
      return state
  }
}

export default rootReducer
