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
    email: '',
    auth: false,
    errors: {}
  },
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

const signupRequest = (state, action) => {
  const newState = {
    isFetching: true,
    isAuthenticated: false,
    user: action.creds
  }

}

const userAuth = (state, action) => {
  console.log('user auth action:', action)
  // const newUserAuth = {
  //   email: action.email,
  //   auth: action.auth,
  //   feeds: action.feeds
  // }
  const newState = {...state, ...{user: action.user}}
  return newState
}

const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return userAuth(state, action)
    default:
      return state
  }
}

export default authReducer
