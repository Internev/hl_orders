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
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILURE
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
  orderForm: [],
  orderTotalAmt: 0,
  orderTotalPrice: 0,
  msg: '',
  searchTerm: ''
}

const uploadOrderForm = (state, action) => {
  console.log('uploadOrderForm action:', action)
}

const uploadOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{orderForm: action.data.storedOrder, msg: action.msg}}
  return newState
}

const uploadOrderFormFailure = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const getOrderFormSuccess = (state, action) => {
  const newState = {...state, ...{orderForm: action.data.storedOrder}}
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

const saveOrderSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{msg: action.data.message}
  }
  return newState
}

const saveOrderFailure = (state, action) => {
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
    auth: action.msg
  }
  const newState = {...state, ...update}
  return newState
}

const loginSuccess = (state, action) => {
  console.log('Login Success Reducer, actiondatauser:', action.data.user)
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
  return DEFAULT_STATE
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
    case SAVE_ORDER_SUCCESS:
      return saveOrderSuccess(state, action)
    case SAVE_ORDER_FAILURE:
      return saveOrderFailure(state, action)
    default:
      return state
  }
}

export default rootReducer
