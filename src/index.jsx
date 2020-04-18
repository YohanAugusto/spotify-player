import React, { useEffect, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'
import { Album, Callback, Home, Search } from 'views'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'components'
import UserContext from 'stores/UserStore'
import { validateToken, handleNotAuthenticated } from 'utils'

import './App.module.scss'
import 'typeface-roboto'

export const StoreContext = React.createContext()

dotenv.config()

const customHistory = createBrowserHistory()
customHistory.listen(() => window?.tracker?.pageView())

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userStore = useContext(UserContext)
  const [isTokenValidated, setIsTokenValidated] = useState(null)

  useEffect(() => {
    const tryValidateToken = async () => {
      const token = await validateToken()
      if (token) {
        userStore.updateUser(token.data)
        setIsTokenValidated(true)
      } else {
        setIsTokenValidated(false)
      }
    }

    tryValidateToken()
  }, [userStore])

  if (isTokenValidated === null) {
    return null
  }

  return (
    <Route
      {...rest}
      render={props => {
        return isTokenValidated ? <Component {...props} /> : handleNotAuthenticated()
      }}
    />
  )
}

ReactDOM.render(
  <Router history={customHistory}>
    <Switch>
      <Layout>
        <Route exact path='/' render={props => <Home {...props} />} />
        <Route exact path='/callback' render={props => <Callback {...props} />} />
        <PrivateRoute path='/search' component={Search} />
        <PrivateRoute path='/album/:id' component={Album} />
      </Layout>
    </Switch>
  </Router>,
  document.getElementById('root'),
)
