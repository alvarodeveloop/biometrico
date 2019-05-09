import React from 'react'
import PropTypes from 'prop-types'

class HomeMaster extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      user : JSON.parse(localStorage.user),

    }
  }

  render () {
    const { user } = this.state

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="jumbotron">
            <h1>Bienvendido {user.nombre+' '+user.apellido}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeMaster;
