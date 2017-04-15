import React from 'react'
// import { Route, BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { browserHistory, Router } from 'react-router'
import routes from './routes'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className='app'>
          <Router history={browserHistory} routes={routes} />
        </div>
      </Provider>
    )
  }
}

export default App
