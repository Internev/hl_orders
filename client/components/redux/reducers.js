import { SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
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
  authErrors: {
    success: false,
    message: '',
    errors: {}
  }
}

const requestSignup = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const signupError = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    authErrors: action.msg
  }
  const newState = {...state, ...update}
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return requestSignup(state, action)
    case SIGNUP_FAILURE:
      return signupError(state, action)
    default:
      return state
  }
}

export default rootReducer
