import React from 'react'
import PropTypes from 'prop-types'
import Asistencia from './Asistencia'
class AssistByEnte extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return(
      <div className="">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <h4 className="alert alert-info text-center">Este módulo muestra de primero las asistencia del día de hoy.</h4>
          </div>
        </div>
        <Asistencia
          idEnte={this.props.match.params.id}
          />
      </div>
    )
  }
}

export default AssistByEnte;
