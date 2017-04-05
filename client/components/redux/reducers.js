import { SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REDIRECT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from './actions'

const DEFAULT_STATE = {
  user: {
    userId: null,
    name: '',
    email: ''
  },
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  id_token: '',
  auth: {
    success: false,
    message: '',
    errors: {}
  }
}

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
  // const newState = {
  //   ...state,
  //   ...{
  //     isFetching: action.isFetching,
  //     isAuthenticated: action.isAuthenticated,
  //     id_token: null,
  //     auth: {
  //       success: false,
  //       message: '',
  //       errors: {}
  //     }
  //   }}
  return DEFAULT_STATE
}

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
    default:
      return state
  }
}

export default rootReducer
