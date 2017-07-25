import {
  GET_PROXY_USER
} from './actions'

const DEFAULT_STATE = {
  stores: []
}

const getProxyUser = (state, action) => {
  const newState = {...state, ...{processing: true}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PROXY_USER:
      return getProxyUser(state, action)
    default:
      return state
  }
}
