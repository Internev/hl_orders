import { combineReducers } from 'redux'
import user from './userReducers'
import order from './orderFormReducers'
import proxyUser from './proxyUserReducers'
import {
  CUSTOMERS_SUCCESS,
  CUSTOMERS_FAILURE,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_COMPLETE
} from './actions'

const DEFAULT_STATE = {
  msg: ''
}

const clearComplete = (state, action) => {
  const newState = {...state, ...{orderComplete: false, addinfo: {}, proxyUserMsg: ''}}
  return newState
}

const setMessage = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const clearMessage = (state, action) => {
  const newState = {...state, ...{msg: ''}}
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

const root = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CUSTOMERS_SUCCESS:
      return customersSuccess(state, action)
    case CUSTOMERS_FAILURE:
      return customersFailure(state, action)
    case SET_MESSAGE:
      return setMessage(state, action)
    case CLEAR_MESSAGE:
      return clearMessage(state, action)
    case CLEAR_COMPLETE:
      return clearComplete(state, action)
    default:
      return state
  }
}

export default combineReducers({
  root,
  user,
  order,
  proxyUser
})
