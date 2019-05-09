import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
let interval = null
let count = 0

class App extends Component {

    constructor(props){
      super(props)
      this.initInterval = this.initInterval.bind(this)
    }

    componentWillMount(){
      if(this.props.isAuthenticated){
        //interval = this.initInterval()
      }
    }

    componentWillReceiveProps(nextProps){

      if(nextProps.isAuthenticated){
        //interval = this.initInterval()
      }else{
        clearInterval(interval)
      }
    }

    initInterval(){
      return setInterval(function () {
        count++
        if(count === 170){

        }
      }, 60000);
    }

    render() {
      const { children } = this.props

      return (
          <div className="container-fluid">
            <Header />
            <Content body={ children }/>
            <Footer />

          </div>
      );
    }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

App.defaultProps = {
    interval: {}
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,{})(App)
