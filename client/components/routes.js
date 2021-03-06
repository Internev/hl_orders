
import Frame from './Frame'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import OrderForm from './OrderForm'
import Radmin from './Radmin'
import ConfirmOrder from './ConfirmOrder'
import OrderSummary from './OrderSummary'
import OrderHistory from './OrderHistory'
import StoreMap from './geo/StoreMap'
import store from './redux/store'
import { logoutUser } from './redux/authCreators'
import { clearMessage } from './redux/actionCreators'

const routes = {
  // base component (wrapper for the whole application).
  component: Frame,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        store.dispatch(clearMessage())
        if (store.getState().user.isAuthenticated) {
          callback(null, OrderForm)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/orderform',
      getComponent: (location, callback) => {
        if (store.getState().user.isAuthenticated) {
          callback(null, OrderForm)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/radmin',
      getComponent: (location, callback) => {
        store.dispatch(clearMessage())
        console.log('admin path, post clearMessage')
        if (store.getState().user.isAuthenticated) {
          callback(null, Radmin)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/confirm',
      getComponent: (location, callback) => {
        if (store.getState().user.isAuthenticated) {
          callback(null, ConfirmOrder)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/ordersummary',
      getComponent: (location, callback) => {
        if (store.getState().user.isAuthenticated) {
          callback(null, OrderSummary)
        } else {
          callback(null, LoginPage)
        }
      }
    },
    {
      path: '/orderhistory',
      getComponent: (location, callback) => {
        store.dispatch(clearMessage())
        if (store.getState().user.isAuthenticated) {
          callback(null, OrderHistory)
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
        // change the current URL to /login
        replace('/login')
      }
    },

    {
      path: '/map',
      component: StoreMap
    }
  ]
}

export default routes
