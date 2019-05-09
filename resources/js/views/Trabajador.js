import React from 'react'
import WrappedTable from '../components/Basic/WrappedTable'
import axios from 'axios'
import TrabajadorForm from '../components/form/TrabajadorForm'

class Trabajador extends React.Component{

  constructor(props){
    super(props)
      this.state = {
        thead: [
          'Nombre',
          'Telefono',
          'Cédula',
          'Email',
          'Turno',
          'Cargo',
          'Foto',
          'Acción',
        ],
        tbody_key: [
          'nombre',
          'telefono',
          'cedula',
          'email',
          'turno',
          'cargo',
          'imagen',
        ],
        tbody: [],
        editRoute: '/editTrabajador/'
      }

      this.get = this.get.bind(this)
      this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/trabajador').then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }


  delete(id){
    axios.delete('/api/trabajador/'+id).then(res => {
      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render(){
    const {thead,tbody,tbody_key,editRoute} = this.state
    return(
      <div>
        <TrabajadorForm get={this.get} />
        <br/>
        <div className="row">
          <WrappedTable
            cols="col-md-12 col-sm-12"
            thead={thead}
            tbody_original={tbody}
            tbody_key={tbody_key}
            delete={this.delete}
            editRoute={editRoute}
            pathImage="/images/trabajador/qrcode/"
          />
        </div>
      </div>
    )
  }
}

export default Trabajador
