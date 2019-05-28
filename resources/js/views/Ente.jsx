import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import EnteForm from '../components/form/EnteForm'
import axios from 'axios'
import Spinner from '../components/Basic/Spinner'

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
      editRoute: '/editEnte/',
      loading: true
    }

    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/ente').then(async res => {
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
    axios.delete('/api/ente/'+id).then(async res => {
      await this.setState({
        loading : true
      });

      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render () {
    const {loading,thead,tbody,tbody_key,editRoute} = this.state

    return(
      <div>
        { loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    )
  }
}

export default Ente;
