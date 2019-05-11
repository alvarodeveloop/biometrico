import React from 'react'
import PropTypes from 'prop-types'
import WrappedTableAssist from '../components/Basic/WrappedTableAssist'
import axios from 'axios'

class Asistencia extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      thead: [
        'Trabajador',
        'Foto Trabajador',
        'Departamento',
        'Cargo',
        'Turno',
        'Tipo',
        'Llegada',
        'Imagen',
        'Fecha',
      ],
      tbody_key: [
        'nombre_trabajador',
        'imagen_trabajador',
        'departamento',
        'cargo',
        'turno',
        'tipo',
        'llegada',
        'imagen',
        'fecha',
      ],
      tbody: [],
      id_worker: null,
      id_ente: null
    }

    this.get = this.get.bind(this)
    this.searchByPeriod = this.searchByPeriod.bind(this)
  }

  componentWillMount(){
    if(this.props.cedulaWorker){
      this.getByCedula(this.props.cedulaWorker)
    }else if(this.props.idEnte){
      this.getByEnte(this.props.idEnte)
    }else{
      this.get()
    }
  }

  componentWillreceiveProps(nextProps){
    if(nextProps.cedulaWorker !== this.state.cedulaWorker){
      this.getByCedula(nextProps.cedulaWorker)
    }
  }

  get(){
    let route = ""
    if(this.props.byDay){
      route = '/api/asistencia_by_day'
    }else{
      route = '/api/asistencia'
    }

    axios.get(route).then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  getByCedula(cedulaWorker){
    axios.get('/api/asistencia_by_cedula/'+cedulaWorker).then(res => {
      this.setState({
        tbody: res.data.asis,
        id_worker: res.data.id_worker
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  getByEnte(ente){
    axios.get('/api/asistencia_by_ente/'+ente).then(res => {
      this.setState({
        tbody: res.data,
        id_ente: ente
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  searchByPeriod(data){
    data.id_ente = this.state.id_ente
    data.id_worker = this.state.id_worker
    axios.post('/api/asistencia_filter',data).then(res =>{
      this.setState({
        tbody: res.data
      })
    })
  }

  render () {
    const {thead,tbody,tbody_key} = this.state

    return(

      <div className="row">
        <WrappedTableAssist
          cols="col-md-12 col-sm-12"
          thead={thead}
          tbody_original={tbody}
          tbody_key={tbody_key}
          pathImage="/images/asistencia/"
          pathImageTrabajador="/images/trabajador/"
          searchByPeriod={this.searchByPeriod}
          hideFilter={this.props.hideFilter}
        />
      </div>
    )
  }
}

Asistencia.propTypes = {
  byDay: PropTypes.bool,
  idTrabajador: PropTypes.string,
  cedulaWorker: PropTypes.string,
  hideFilter: PropTypes.bool,
  idEnte: PropTypes.string,
}

export default Asistencia;
