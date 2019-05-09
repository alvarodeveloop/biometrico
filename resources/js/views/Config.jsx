import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import ConfigForm from '../components/form/ConfigForm'
import axios from 'axios'

class Config extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      thead: [
        'Minutos Extra de Entrada',
        'Minutos Empieza Hora Extra',
        'Accion',
      ],
      tbody_key: [
        'entrada_minuto_extra',
        'salida_minuto_extra'
      ],
      tbody: [],
      editRoute: '/editConfig/'
    }

    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/config').then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  delete(id){
    axios.delete('/api/config/'+id).then(res => {
      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render () {
    const {thead,tbody,tbody_key,editRoute} = this.state

    return(
      <div>
        <ConfigForm get={this.get} />
        <br/>
        <div className="row">
          <WrappedTable
            cols="col-md-12 col-sm-12"
            thead={thead}
            tbody_original={tbody}
            tbody_key={tbody_key}
            delete={this.delete}
            editRoute={editRoute}
            hideEdit={true}
          />
        </div>
      </div>
    )
  }
}

export default Config;
