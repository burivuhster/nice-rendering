import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//// PAGES
import Phrases from './Phrases'
import Test from './Test'

//// THEME
import { CssBaseline, Container } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    type: 'dark'
  }
})

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='md'>
          <Switch>
            <Route path='/' component={Phrases} exact />
            <Route component={Test} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
