import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import ConfigForm from '../components/form/ConfigForm'
import Spinner from '../components/Basic/Spinner'
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
    axios.get('/api/config').then(async res => {

      await this.setState({
        loading: false
      });

      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  delete(id){
    axios.delete('/api/config/'+id).then(async res => {
      await this.setState({
        loading: true
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
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    )
  }
}

export default Config;
