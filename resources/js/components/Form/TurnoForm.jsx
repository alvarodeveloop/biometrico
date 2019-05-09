import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'

class TurnoForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      turno: "",
      desde: "",
      hasta: "",
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fieldForm = this.fieldForm.bind(this)
    this.clear = this.clear.bind(this)

  }

  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(){
    return axios.post('/api/turno',this.state)
  }

  clear(){
    Object.keys(this.state).forEach((v,k) => {
      this.setState({
        [v] : ""
      })
    })
  }

  fieldForm(){

    const {turno,desde,hasta} = this.state

    return(
      <div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="turno"
            type="text"
            label="Nombre Turno"
            requerido={true}
            onChange={this.onChange}
            value={turno}
          />
        </div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="desde"
            type="time"
            label="Desde"
            requerido={true}
            onChange={this.onChange}
            value={desde}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="hasta"
            type="time"
            label="Hasta"
            requerido={true}
            onChange={this.onChange}
            value={hasta}
          />
        </div>
      </div>
    )
  }

  render () {
    const formHtml = this.fieldForm()

    return(
      <ModalForm
        onSubmit={this.onSubmit}
        color="primary"
        label="Crear Turno"
        modalClass="modal-lg"
        modalTitle="Formulario de Turno"
        modalBody={formHtml}
        block={true}
        onSubmit={this.onSubmit}
        get={this.props.get}
        clear={this.clear}
      />
    )
  }
}

TurnoForm.propTypes = {
  get: PropTypes.func.isRequired
}

export default TurnoForm;
