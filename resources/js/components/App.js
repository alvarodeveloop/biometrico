import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class App extends Component {

    constructor(){
      super()
      this.state = {
        user : localStorage.getItem('user')
      }
    }

    render() {
      const { user } = this.state
      const { children } = this.props
      return (
          <div className="container">
              {user && !user.suspendido ? (
                <div className="container">
                  <Header />
                  <Content body={ children }/>
                  <Footer />
                </div>
              ):(
                'No puedes entrar mardiwi'
              )}
          </div>
      );
    }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
