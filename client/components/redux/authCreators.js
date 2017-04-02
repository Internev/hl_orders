import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
 } from './actions'
import axios from 'axios'

function requestSignup (creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveSignup (user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function signupError (msg) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    msg
  }
}

export function signupUser (creds) {
  return dispatch => {
    dispatch(requestSignup(creds))

    return axios.post('/auth/signup', {name: creds.name, email: creds.email, password: creds.password})
      .then(res => {
        if (!res.ok) dispatch(signupError(res))
        localStorage.setItem('id_token', res.user.id_token)
        dispatch(receiveSignup(res.user))
      })
      .catch(err => {
        console.error('auth error:', err)
      })
  }
}

function requestLogin (creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin (user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError (msg) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    msg
  }
}

export function loginUser (creds) {
  return dispatch => {
    dispatch(requestLogin(creds))

    return axios.post('/auth/login', {username: creds.username, password: creds.password})
      .then(res => {
        if (!res.ok) dispatch(loginError(res))
        localStorage.setItem('id_token', res.user.id_token)
        dispatch(receiveLogin(res.user))
      })
      .catch(err => {
        console.error('auth error:', err)
      })
  }
}

function requestLogout () {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout () {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
