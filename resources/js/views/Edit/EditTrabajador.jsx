import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import FormGroup from '../../components/Basic/FormGroup'
import { Button } from 'reactstrap'
import { forkJoin } from 'rxjs'
import map from 'lodash/map'

class EditTrabajador extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user:{
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
        imagen_respaldo: ""
      },
      cargos : [],
      nacionalidades : [{value: 'V',label: 'Venezolano'},{value: 'E', label: 'Extranjero'}],
      turnos: [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.returnBackOnClick = this.returnBackOnClick.bind(this)

  }


  returnBackOnClick(e){
    this.props.history.push('/trabajador')
  }

  async onChange(e){
    await this.setState({
      user : {...this.state.user,[e.target.id]: e.target.value}
    })
  }

  onSubmit(e){
    e.preventDefault()
    let id_update = this.props.match.params.id
    axios.put('/api/trabajador/'+id_update,this.state.user).then(res => {
      this.returnBackOnClick()
    }).catch(err => {
      console.log(err)
    })
  }

  onChangeImage(e){
    if(e.target.files){
      let fileReader = new FileReader()

      fileReader.onload = v => {
        this.setState({
          user: {...this.state.user, imagen: v.target.result}
        })
      }

      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  componentWillMount(){
    let id_search = this.props.match.params.id
    const promises = forkJoin(
        axios.get('/api/cargo'),
        axios.get('/api/turno'),
        axios.get('/api/trabajador/'+id_search)
    )

    promises.subscribe(val => {

      let array_cargos = val[0].data.map((v) => {
        return {value: v.id, label: v.cargo}
      })

      let array_turnos = val[1].data.map((v) => {
        return {value: v.id, label: v.turno}
      })

      let user = {}
      Object.keys(this.state.user).forEach((v,i) => {
        user[v] = val[2].data[v] ? val[2].data[v].toString() : ''
      })
      user.imagen_respaldo = user.imagen

      this.setState({
        cargos: array_cargos,
        turnos: array_turnos,
        user
      })
      console.log(val[2])

    })
  }

  render () {
    const {
      user
    } = this.state

    const { cargos, nacionalidades, turnos} = this.state

    return(
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-10 col-sm-10">
              <br/>
              <br/>
              <h5 className="card-title">Editar Trabajador</h5>
            </div>
            <div className="col-md-2 col-sm-2">
              {user.imagen_respaldo ? (
                <img src={"/images/trabajador/"+user.imagen_respaldo} width="100px" />
              ): ''}
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">

              <br/>
            </div>
            <div className="row">
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="nombre"
                type="text"
                label="Nombre"
                requerido={true}
                onChange={this.onChange}
                value={user.nombre}
              />
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="apellido"
                type="text"
                label="Apellido"
                requerido={true}
                onChange={this.onChange}
                value={user.apellido}
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
                value={user.nacionalidad}
                options={nacionalidades}
              />
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="cedula"
                type="text"
                label="Cédula"
                requerido={true}
                onChange={this.onChange}
                value={user.cedula}
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
                value={user.telefono}
              />
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="direccion"
                type="textarea"
                label="Dirección"
                requerido={true}
                onChange={this.onChange}
                value={user.direccion}
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
                value={user.email}
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
                value={user.id_cargo}
                options={cargos}
              />
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="id_turno"
                type="select"
                label="Turno"
                requerido={true}
                onChange={this.onChange}
                value={user.id_turno}
                options={turnos}
              />
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 offset-md-3 offset-sm-3">
                <Button color="secondary" type="button" onClick={this.returnBackOnClick} block>Volver</Button>
              </div>
              <div className="col-md-3 col-sm-3">
                <Button type="submit" color="primary" block>Editar</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditTrabajador;
