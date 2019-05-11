import React from 'react'
import PropTypes from 'prop-types'
import Asistencia from './Asistencia'
class AssistByEnte extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return(
      <Asistencia
        idEnte={this.props.match.params.id}
      />
    )
  }
}

export default AssistByEnte;
