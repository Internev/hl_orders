import {
  GET_PROXY_USER,
  SET_PROXY_USER,
  SET_PROXY_USER_LIST,
  CLOSE_PROXY_USER_LIST,
  PROXY_USER_FAILURE,
  TOGGLE_ADMIN,
  TOGGLE_AGENT,
  CLEAR_PROXY_USER
} from './actions'

const DEFAULT_STATE = {
  user: {},
  userList: [],
  userListOpen: false,
  msg: '',
  processing: false
}

const getProxyUser = (state, action) => {
  const newState = {...state, ...{processing: true}}
  return newState
}

const setProxyUser = (state, action) => {
  const newState = {...state,
    ...{
      processing: false,
      user: action.user,
      msg: '',
      userListOpen: false
    }}
  return newState
}

const setProxyUserList = (state, action) => {
  const newState = {...state,
    ...{
      userList: action.users,
      userListOpen: true
    }}
  return newState
}

const closeProxyUserList = (state, action) => {
  const newState = {...state, ...{userListOpen: false}}
  return newState
}

const proxyUserFailure = (state, action) => {
  const newState = {...state, ...{msg: action.msg}}
  return newState
}

const toggleAdmin = (state, action) => {
  const newState = {...state, ...{user: action.proxyUser}}
  return newState
}

const toggleAgent = (state, action) => {
  const newState = {...state, ...{user: action.proxyUser}}
  return newState
}

const clearProxyUser = (state, action) => {
  return DEFAULT_STATE
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PROXY_USER:
      return getProxyUser(state, action)
    case SET_PROXY_USER:
      return setProxyUser(state, action)
    case SET_PROXY_USER_LIST:
      return setProxyUserList(state, action)
    case CLOSE_PROXY_USER_LIST:
      return closeProxyUserList(state, action)
    case PROXY_USER_FAILURE:
      return proxyUserFailure(state, action)
    case TOGGLE_ADMIN:
      return toggleAdmin(state, action)
    case TOGGLE_AGENT:
      return toggleAgent(state, action)
    case CLEAR_PROXY_USER:
      return clearProxyUser(state, action)
    default:
      return state
  }
}
