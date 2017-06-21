import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey900, grey800, grey700, amber400, amber500, amber600} from 'material-ui/styles/colors'
import App from './components/App'
import style from './style/main.scss'

injectTapEventPlugin()

const hlTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    primary2Color: grey800,
    primary3Color: grey700,
    accent1Color: amber400,
    accent2Color: amber500,
    accent3Color: amber600
  }
})

render((<MuiThemeProvider muiTheme={hlTheme}>
  <App />
</MuiThemeProvider>), document.getElementById('app'))
