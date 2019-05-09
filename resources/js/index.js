import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import { login } from './action/Auth'
import setAuthorizationToken from './utils/setAuthorizationToken'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/App.css'

const store = createStore(
  rootReducer,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.token && localStorage.user){
  setAuthorizationToken(localStorage.token);
  store.dispatch(login(JSON.parse(localStorage.user)))
}

if (document.getElementById('root')) {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>,
      document.getElementById('root'));
}
