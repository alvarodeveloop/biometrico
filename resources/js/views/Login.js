import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import LoginForm from '../components/Form/LoginForm'
import { login } from '../action/Auth'

class Login extends Component {

  constructor(props){
      super(props)
      this.redirect = this.redirect.bind(this)
  }

  redirect(){
    const user = JSON.parse(localStorage.user)
    console.log(user.id_perfil,'aquii')
    switch (parseInt(user.id_perfil)) {
      case 1:
        this.props.history.push('/homeMaster')
      break;
      case 2:
        this.props.history.push('/homeAdmin')
      break;
      case 3:
          this.props.history.push('/home')
      break;

    }
  }

  render() {
    return (
      <LoginForm
        login={this.props.login}
        redirect={this.redirect}
      />
    );
  }
}

function mapDispatchToProps(){
  return {
    login
  }
}

Login.propTypes = {
    login : PropTypes.func.isRequired
}

export default connect(null,mapDispatchToProps())(Login)
