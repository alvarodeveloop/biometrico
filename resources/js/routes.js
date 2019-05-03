import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './components/App'
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/NotFound'

export const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={Login}  />
      <Route path="/home" component={Home}  />
      <Route component={NotFound}  />
    </Switch>
  </App>
