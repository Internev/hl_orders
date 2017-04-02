import { ADD_FEED, IMPORT_FEEDS, SHOW_FEED, USER_AUTH } from './actions'
import axios from 'axios'

export function addFeed (feed) {
  return { type: ADD_FEED, feed }
}

export function importFeeds (feeds) {
  return { type: IMPORT_FEEDS, feeds }
}

function showFeed (feed, posts) {
  return { type: SHOW_FEED, feed, posts }
}

export function getFeed (feed) {
  return (dispatch, getState) => {
    axios.post('/getFeed', {'site': feed})
      .then(res => {
        dispatch(showFeed(feed, res.data.entries))
      })
      .catch(err => {
        console.error('axios error:', err)
      })
  }
}

function userAuth (user) {
  return { type: USER_AUTH, user }
}

export function getUser (user) {
  return (dispatch, getState) => {
    axios.post('/auth', {'email': user.email, 'password': user.password})
      .then(res => {
        console.log('get user response received:', res.data.email)
        dispatch(userAuth({'email': res.data.email, 'auth': true, 'feeds': res.data.feeds}))
      })
      .catch(err => {
        console.error('getUser axios error:', err)
      })
  }
}
