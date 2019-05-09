import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'

class ConfigForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      entrada_minuto_extra: "",
      salida_minuto_extra: "",
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
    return axios.post('/api/config',this.state)
  }

  clear(){
    Object.keys(this.state).forEach((v,k) => {
      this.setState({
        [v] : ""
      })
    })
  }

  fieldForm(){

    const {entrada_minuto_extra,salida_minuto_extra} = this.state

    return(
      <div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="entrada_minuto_extra"
            type="number"
            label="Minutos de entrada extra"
            requerido={true}
            onChange={this.onChange}
            value={entrada_minuto_extra}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="salida_minuto_extra"
            type="number"
            label="Minutos desde que empieza la hora extra"
            requerido={true}
            onChange={this.onChange}
            value={salida_minuto_extra}
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
        label="Crear Configuración"
        modalClass="modal-lg"
        modalTitle="Formulario de Configuración"
        modalBody={formHtml}
        block={true}
        onSubmit={this.onSubmit}
        get={this.props.get}
        clear={this.clear}
      />
    )
  }
}

ConfigForm.propTypes = {
  get: PropTypes.func.isRequired
}

export default ConfigForm;
