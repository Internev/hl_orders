import { ADD_FEED, IMPORT_FEEDS, SHOW_FEED, USER_AUTH } from './actions'

const DEFAULT_STATE = {
  feeds: [],
  activeFeed: {
    feed: '',
    posts: []
  },
  user: {
    email: '',
    auth: false
  }
}

const addFeed = (state, action) => {
  const newFeed = [...state.feeds, action.feed]
  const newState = {...state, ...{feeds: newFeed}}
  return newState
}

const importFeeds = (state, action) => {
  const newFeeds = [...state.feeds, ...action.feeds]
  const newState = {...state, ...{feeds: newFeeds}}
  return newState
}

const showFeed = (state, action) => {
  const newActiveFeed = {
    feed: action.feed,
    posts: action.posts
  }
  const newState = {...state, ...{activeFeed: newActiveFeed}}
  return newState
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
