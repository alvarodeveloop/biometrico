import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import FormGroup from '../../components/Basic/FormGroup'
import { Button } from 'reactstrap'
import Spinner from '../../components/Basic/Spinner'

class EditDepartamento extends React.Component {
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
      loading: true,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.returnBackOnClick = this.returnBackOnClick.bind(this)
  }

  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()
    let id_edit = this.props.match.params.id
    axios.put('/api/departamento/'+id_edit,this.state).then(res => {
      this.returnBackOnClick()
    }).catch(err => {
      console.log(err)
    })
  }

  returnBackOnClick(e){
    this.props.history.push('/departamento')
  }

  componentDidMount(){
    axios.get('/api/departamento/'+this.props.match.params.id).then(async res => {

      await this.setState({
        loading : false
      });

      Object.keys(this.state).forEach((v,i) => {
        this.setState({
          [v]: res.data[0][v]
        })
      })
    }).catch(err => {

    })
  }

  render () {

    const {loading, departamento,email,nombre,telefono,cedula,direccion,apellido} = this.state

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
              <h5 className="card-tilte">Editar Departamento</h5>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
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
                <br/>
                <h3 className="text-center">Datos del Jefe del Departamento</h3>
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
                    id="telefono"
                    type="number"
                    label="Teléfono"
                    requerido={true}
                    onChange={this.onChange}
                    value={telefono}
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
                    id="direccion"
                    type="textarea"
                    label="Dirección"
                    requerido={true}
                    onChange={this.onChange}
                    value={direccion}
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
        )}
      </div>

    )
  }
}

export default EditDepartamento;
