
import Frame from './Frame'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'
import Radmin from './Radmin'
import store from './redux/store'
import { logoutUser } from './redux/authCreators'

const routes = {
  // base component (wrapper for the whole application).
  component: Frame,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (store.getState().isAuthenticated) {
          callback(null, Dashboard)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/radmin',
      getComponent: (location, callback) => {
        if (store.getState().isAuthenticated) {
          callback(null, Radmin)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        store.dispatch(logoutUser())
        // change the current URL to /
        replace('/')
      }
    }
  ]
}

export default routes
