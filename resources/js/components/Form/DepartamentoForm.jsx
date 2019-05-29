import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'

class EnteForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      departamento: "",
      nombre: "",
      apellido: "",
      telefono: "",
      cedula: "",
      direccion: "",
      email: "",
      nacionalidad: "",
      nacionalidades : [{value: 'V',label: 'Venezolano'},{value: 'E', label: 'Extranjero'}],
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
    return axios.post('/api/departamento',this.state)
  }

  clear(){
    Object.keys(this.state).forEach((v,k) => {
      this.setState({
        [v] : ""
      })
    })
  }

  fieldForm(){

    const {departamento,email,nombre,telefono,cedula,direccion,apellido} = this.state

    return(
      <div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="departamento"
            type="text"
            label="Nombre Departamento"
            requerido={true}
            onChange={this.onChange}
            value={departamento}
          />
        </div>
        <h3>Datos del Director del Departamento</h3>
        <br/>
        <div className="row">
          <br/>
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="nombre"
            type="text"
            label="Nombre"
            requerido={true}
            onChange={this.onChange}
            value={nombre}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="apellido"
            type="text"
            label="Apellido"
            requerido={true}
            onChange={this.onChange}
            value={apellido}
          />
        </div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="nacionalidad"
            type="select"
            label="Nacionalidad"
            requerido={true}
            onChange={this.onChange}
            value={nacionalidad}
            options={this.state.nacionalidades}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="cedula"
            type="number"
            label="Cédula"
            requerido={true}
            onChange={this.onChange}
            value={cedula}
          />
        </div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="telefono"
            type="number"
            label="Teléfono"
            requerido={true}
            onChange={this.onChange}
            value={telefono}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="email"
            type="text"
            label="Email"
            requerido={true}
            onChange={this.onChange}
            value={email}
          />
      </div>
      <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="direccion"
            type="textarea"
            label="Dirección"
            requerido={true}
            onChange={this.onChange}
            value={direccion}
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
        label="Crear Departamento"
        modalClass="modal-lg"
        modalTitle="Formulario de Departamento"
        modalBody={formHtml}
        block={true}
        onSubmit={this.onSubmit}
        get={this.props.get}
        clear={this.clear}
      />
    )
  }
}

EnteForm.propTypes = {
  get: PropTypes.func.isRequired
}

export default EnteForm;
