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
        'Departamento',
        'Cargo',
        'Turno',
        'Tipo',
        'LLegada',
        'Fecha',
      ],
      tbody_key: [
        'nombre_trabajador',
        'departamento',
        'cargo',
        'turno',
        'tipo',
        'llegada',
        'fecha',
      ],
      tbody: [],
    }

    this.get = this.get.bind(this)
    this.searchByPeriod = this.searchByPeriod.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    let route = this.props.byDay ? '/api/asistencia_by_day' : '/api/asistencia'

    axios.get(route).then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  searchByPeriod(state){
    axios.post('/api/asistencia_filter',state).then(res =>{
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
          pathImage="/images/trabajador/asistencia/"
          searchByPeriod={this.searchByPeriod}
        />
      </div>
    )
  }
}

Asistencia.propTypes = {
  byDay: PropTypes.bool
}

export default Asistencia;
