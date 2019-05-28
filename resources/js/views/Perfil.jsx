import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../components/Basic/FormGroup'
import Spinner from '../components/Basic/Spinner'
import axios from 'axios'

class Perfil extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      nombre: "",
      apellido: "",
      cedula: "",
      nacionalidad: "",
      telefono: "",
      direccion: "",
      email: "",
      password: "",
      nacionalidades : [{value: 'V',label: 'Venezolano'},{value: 'E', label: 'Extranjero'}],
      user: JSON.parse(localStorage.user),
      loading: true,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentWillMount(){
    let user = this.state.user
    axios.get('/api/user/'+user.id).then( async res => {
      await this.setState({
        loading : false
      });

      this.setState({
        nombre:res.data.nombre,
        apellido:res.data.apellido,
        cedula:res.data.cedula,
        nacionalidad:res.data.nacionalidad,
        telefono:res.data.telefono,
        direccion:res.data.direccion,
        email:res.data.email,
      });
    }).catch(err => {
      console.log(err)
    })
  }

  onSubmit(e){
    e.preventDefault()
    let user = this.state.user
    let filter = Object.assign({},this.state)
    delete filter.nacionalidades
    delete filter.user

    axios.put('/api/user/'+user.id,filter).then(res =>{
      alert('Registro Editado')
      this.props.history.push('/home')
    }).catch(err => {
      console.log(err)
    })
  }

  onChange(e){
      this.setState({
        [e.target.id]: e.target.value
      });
  }

  render () {
    const {loading, nombre, apellido, cedula, nacionalidad, direccion, email, password,telefono } = this.state
    return(
      <div>
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Pefil de la Cuenta</h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Nombre"
                    requerido={true}
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={this.onChange}
                    />
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Apellido"
                    requerido={true}
                    id="apellido"
                    type="text"
                    value={apellido}
                    onChange={this.onChange}
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
                    label="Cédula"
                    requerido={true}
                    id="cedula"
                    type="number"
                    value={cedula}
                    onChange={this.onChange}
                    />
                </div>
                <div className="row">
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Teléfono"
                    requerido={true}
                    id="telefono"
                    type="text"
                    value={telefono}
                    onChange={this.onChange}
                    />
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Dirección"
                    requerido={true}
                    id="direccion"
                    type="textarea"
                    value={direccion}
                    onChange={this.onChange}
                    />
                </div>
                <div className="row">
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Email"
                    requerido={true}
                    id="email"
                    type="email"
                    value={email}
                    onChange={this.onChange}
                    />
                  <FormGroup
                    cols="col-md-6 col-sm-6"
                    label="Password"
                    requerido={false}
                    id="password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    />
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6 offset-md-3 offset-sm-3 ">
                    <button type="submit" className="btn btn-primary btn-block">Modificar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Perfil;
