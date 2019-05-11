import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'

class EnteForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      ente: "",
      nombre: "",
      apellido: "",
      telefono: "",
      cedula: "",
      direccion: "",
      email: "",
      direccion_ente: "",
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
    let data = Object.assign({},this.state)
    delete data.nacionalidades
    return axios.post('/api/ente',data)
  }

  clear(){
    Object.keys(this.state).forEach((v,k) => {
      if(v !== "nacionalidades"){
        this.setState({
          [v] : ""
        })
      }
    })
  }

  fieldForm(){

    const {ente,direccion_ente,email,nombre,telefono,cedula,direccion,apellido,nacionalidad,nacionalidades} = this.state

    return(
      <div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="ente"
            type="text"
            label="Nombre Ente"
            requerido={true}
            onChange={this.onChange}
            value={ente}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="direccion_ente"
            type="textarea"
            label="Dirección Ente"
            requerido={true}
            onChange={this.onChange}
            value={direccion_ente}
          />
        </div>
        <h3>Datos del Jefe del Ente</h3>
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
            id="email"
            type="text"
            label="Email"
            requerido={true}
            onChange={this.onChange}
            value={email}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="telefono"
            type="number"
            label="Teléfono"
            requerido={true}
            onChange={this.onChange}
            value={telefono}
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
        label="Crear Ente"
        modalClass="modal-lg"
        modalTitle="Formulario de Entes"
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
