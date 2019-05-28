import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import TurnoForm from '../components/form/TurnoForm'
import axios from 'axios'
import Spinner from '../components/Basic/Spinner'

class Turno extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      thead: [
        'Turno',
        'Desde',
        'Hasta',
        'Acción',
      ],
      tbody_key: [
        'turno',
        'desde',
        'hasta',
      ],
      tbody: [],
      editRoute: '/editTurno/',
      user: JSON.parse(localStorage.user),
      loading: true
    }

    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/turno').then(async res => {

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
    axios.delete('/api/turno/'+id).then(async res => {

      await this.setState({
        loading : true
      });

      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render () {
    const {thead,tbody,tbody_key,editRoute,user,loading} = this.state

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
            {user.id_perfil === 2 ? (
              <TurnoForm get={this.get} />
            ) : (null)}
            <br/>
            <div className="row">
              <WrappedTable
                cols="col-md-12 col-sm-12"
                thead={thead}
                tbody_original={tbody}
                tbody_key={tbody_key}
                delete={this.delete}
                editRoute={editRoute}
                hideDelete={user.id_perfil === 2 ? false : true}
                hideEdit={user.id_perfil === 2 ? false : true}
                />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Turno;
