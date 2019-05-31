import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { toggle } from '../action/modal'
import { logout } from '../action/Auth'
import logoutSystem from  '../utils/logout'
import setAuthorizationToken from '../utils/setAuthorizationToken'

import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
let interval = null
let validateInterval = false
let count = 0

class App extends Component {

    constructor(props){
      super(props)

      this.initInterval = this.initInterval.bind(this)
      this.toggle1 = this.toggle1.bind(this)
      this.extedsSession = this.extedsSession.bind(this)
      if(localStorage.count){
        count = parseInt(localStorage.count)
      }
    }

    componentWillMount(){
      if(this.props.isAuthenticated){
        if(!validateInterval){
          validateInterval = true
          interval = this.initInterval()
        }
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.isAuthenticated){
        if(!validateInterval){
          validateInterval = true
          interval = this.initInterval()
        }
      }else{
        validateInterval = false
        count = 0
        clearInterval(interval)
      }
    }

    initInterval(){
      return setInterval( () =>{
        count++
        localStorage.setItem('count',count)
        this.extedsSession()
      }, 120000);
    }

    toggle1(){
      this.props.toggle()
    }

    extedsSession(){
      axios.post('/api/auth/refresh').then(res => {
        let token = res.data.access_token
        localStorage.setItem('token',token)
        setAuthorizationToken(token)
        this.props.toggle()
        count = 0
        localStorage.setItem('count',count)
      })
    }

    render() {
      const { children } = this.props

      return (
          <div className="container-fluid">
            <Header />
            <Content body={ children }/>
            <Footer />
            <Modal isOpen={this.props.isOpen} toggle={this.toggle1} className='modal-lg'>
              <ModalHeader toggle={this.toggle1}>Extender Sesión</ModalHeader>
                <ModalBody>
                  <p className="text-center">Queda poco tiempo de sesión, ¿Desea extenderla?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.extedsSession}>Aceptar</Button>
                  <Button color="secondary" onClick={this.toggle1}>Cancelar</Button>
                </ModalFooter>
            </Modal>
          </div>
      );
    }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

App.defaultProps = {
    interval: {}
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isOpen: state.modal.isOpen
  }
}

function mapDispatchToProps(){
  return{
    toggle,
    logout
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(App)
