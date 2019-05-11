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
    this.props.history.push('/home')
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
