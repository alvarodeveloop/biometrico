import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default WrappedComponent => {

  class Authenticated extends React.Component {

    constructor(props){
      super(props)


    }

    componentWillReceiveProps(nextProps){
      if(!nextProps.isAuthenticated){
        this.props.history.push('/')
      }
    }

    componentWillMount(){
      if(!this.props.isAuthenticated){
        this.props.history.push('/')
      }
    }

    render(){

      return(
        <WrappedComponent {...this.props} />
      )
    }
  }

  function mapStateToProps(state){
    return{
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  Authenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  return connect(mapStateToProps,{})(Authenticated)
}
