import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import EnteForm from '../components/form/EnteForm'
import axios from 'axios'

class Ente extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      thead: [
        'Ente',
        'Dirección',
        'Jefe',
        'Teléfono',
        'Email',
        'Acción',
      ],
      tbody_key: [
        'ente',
        'direccion_ente',
        'nombre',
        'telefono',
        'email',
      ],
      tbody: [],
      editRoute: '/editEnte/'
    }

    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/ente').then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  delete(id){
    axios.delete('/api/ente/'+id).then(res => {
      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render () {
    const {thead,tbody,tbody_key,editRoute} = this.state

    return(
      <div>
        <EnteForm get={this.get} />
        <br/>
        <div className="row">
          <WrappedTable
            cols="col-md-12 col-sm-12"
            thead={thead}
            tbody_original={tbody}
            tbody_key={tbody_key}
            delete={this.delete}
            editRoute={editRoute}
          />
        </div>
      </div>
    )
  }
}

export default Ente;
