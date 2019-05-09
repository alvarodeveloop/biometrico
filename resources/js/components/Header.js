import React, { Component } from 'react';
import  Navbar  from './Basic/Navbar'
import PropTypes from 'prop-types'

class Header extends Component {

  render(){
    const { navigation } = this.props
    return (
      <div>
        <Navbar />
        <br/>
      </div>
    )
  }
}

export default Header
