import React from 'react'
import WrappedTable from '../components/Basic/WrappedTable'
import axios from 'axios'
import TrabajadorForm from '../components/form/TrabajadorForm'
import Spinner from '../components/Basic/Spinner'

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
        editRoute: '/editTrabajador/',
        loading: true
      }

      this.get = this.get.bind(this)
      this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/trabajador').then(async res => {
      await this.setState({
        loading : false
      });
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  delete(id){
    axios.delete('/api/trabajador/'+id).then(async res => {

      await this.setState({
        loading : true
      });

      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render(){
    const {loading,thead,tbody,tbody_key,editRoute,isOpenTake} = this.state
    return(
      <div>
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
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
                pathImage="/images/trabajador/"
                isWorker={true}
                />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Trabajador
