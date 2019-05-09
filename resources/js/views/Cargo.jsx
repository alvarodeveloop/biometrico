import React from 'react'
import PropTypes from 'prop-types'
import WrappedTable from '../components/Basic/WrappedTable'
import CargoForm from '../components/form/CargoForm'
import axios from 'axios'

class Cargo extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      thead: [
        'Cargo',
        'Accion',
      ],
      tbody_key: [
        'cargo',
      ],
      tbody: [],
      editRoute: '/editCargo/'
    }

    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount(){
    this.get()
  }

  get(){
    axios.get('/api/cargo').then(res => {
      this.setState({
        tbody: res.data
      })
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  delete(id){
    axios.delete('/api/cargo/'+id).then(res => {
      this.get()
    }).catch(({response}) => {
      alert(response.data.error)
    })
  }

  render () {
    const {thead,tbody,tbody_key,editRoute} = this.state

    return(
      <div>
        <CargoForm get={this.get} />
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

export default Cargo;
