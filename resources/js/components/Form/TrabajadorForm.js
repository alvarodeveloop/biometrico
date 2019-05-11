import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'
import { forkJoin } from 'rxjs'
class TrabajadorForm extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      nombre: "",
      apellido: "",
      telefono: "",
      cedula: "",
      direccion: "",
      email:"",
      imagen: "",
      id_turno: "",
      id_cargo: "",
      nacionalidad: "",
      cargos : [],
      nacionalidades : [{value: 'V',label: 'Venezolano'},{value: 'E', label: 'Extranjero'}],
      turnos: [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fieldForm = this.fieldForm.bind(this)
    this.clear = this.clear.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
  }


  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(){
    return axios.post('/api/trabajador',this.state)
  }

  onChangeImage(e){
    if(e.target.files){
      let fileReader = new FileReader()

      fileReader.onload = v => {
        this.setState({
          imagen: v.target.result
        })
      }

      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  componentWillMount(){
    const promises = forkJoin(
        axios.get('/api/cargo'),
        axios.get('/api/turno')
    )

    promises.subscribe(val => {

      let array_cargos = val[0].data.map((v) => {
        return {value: v.id, label: v.cargo}
      })

      let array_turnos = val[1].data.map((v) => {
        return {value: v.id, label: 'Nombre: '+v.turno+' desde:'+v.desde+' hasta:'+v.hasta}
      })

      this.setState({
        cargos: array_cargos,
        turnos: array_turnos
      })

    })
  }

  clear(){

    this.setState({
      nombre: "",
      apellido: "",
      telefono: "",
      cedula: "",
      direccion: "",
      email:"",
      imagen: "",
      id_turno: "",
      id_cargo: "",
      nacionalidad: "",
    })

  }


  fieldForm(){

    const {
      nombre,apellido,telefono,cedula,direccion,nacionalidad,
      nacionalidades,id_cargo,cargos,id_turno,turnos,email

    } = this.state

    return(
      <div>
        <div className="row">
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
            label="nacionalidad"
            requerido={true}
            onChange={this.onChange}
            value={nacionalidad}
            options={nacionalidades}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="cedula"
            type="text"
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
            type="text"
            label="Teléfono"
            requerido={false}
            onChange={this.onChange}
            value={telefono}
          />
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
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="email"
            type="email"
            label="Email"
            requerido={false}
            onChange={this.onChange}
            value={email}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="imagen"
            type="file"
            label="Imagen"
            requerido={false}
            onChange={this.onChangeImage}
          />
        </div>
        <div className="row">
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="id_cargo"
            type="select"
            label="Cargo"
            requerido={true}
            onChange={this.onChange}
            value={id_cargo}
            options={cargos}
          />
          <FormGroup
            cols="col-md-6 col-sm-6"
            id="id_turno"
            type="select"
            label="Turno"
            requerido={true}
            onChange={this.onChange}
            value={id_turno}
            options={turnos}
          />
        </div>
      </div>
    )
  }

  render(){
    const formHtml = this.fieldForm()

    return(
      <ModalForm
        onSubmit={this.onSubmit}
        color="primary"
        label="Crear Trabajador"
        modalClass="modal-lg"
        modalTitle="Formulario Trabajadores"
        modalBody={formHtml}
        block={true}
        onSubmit={this.onSubmit}
        get={this.props.get}
        clear={this.clear}
      />
    )
  }
}

TrabajadorForm.propTypes = {
  get: PropTypes.func.isRequired
}

export default TrabajadorForm
