// import Base from './components/Base.jsx'
// import HomePage from './components/HomePage.jsx'
// import DashboardPage from './containers/DashboardPage.jsx'
// import LoginPage from './containers/LoginPage.jsx'
// import SignUpPage from './containers/SignUpPage.jsx'
// import Auth from './modules/Auth'
import Frame from './Frame'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'

const routes = {
  // base component (wrapper for the whole application).
  component: Frame,
  childRoutes: [

    // {
    //   path: '/',
    //   getComponent: (location, callback) => {
    //     if (Auth.isUserAuthenticated()) {
    //       callback(null, DashboardPage)
    //     } else {
    //       callback(null, HomePage)
    //     }
    //   }
    // // },
    //
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

    // {
    //   path: '/logout',
    //   onEnter: (nextState, replace) => {
    //     Auth.deauthenticateUser()
    //
    //     // change the current URL to /
    //     replace('/')
    //   }
    // }

  ]
}

export default routes
