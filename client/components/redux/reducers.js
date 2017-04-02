import { ADD_FEED, IMPORT_FEEDS, SHOW_FEED, USER_AUTH } from './actions'

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

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FEED:
      return addFeed(state, action)
    case IMPORT_FEEDS:
      return importFeeds(state, action)
    case SHOW_FEED:
      return showFeed(state, action)
    case USER_AUTH:
      return userAuth(state, action)
    default:
      return state
  }
}

export default rootReducer
