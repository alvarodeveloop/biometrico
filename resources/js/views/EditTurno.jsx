import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import FormGroup from '../../components/Basic/FormGroup'
import { Button } from 'reactstrap'

class EditTurno extends React.Component {
  constructor(props){
    super(props)

    this.state = {

      turno: "",
      desde: "",
      hasta: "",
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.returnBackOnClick = this.returnBackOnClick.bind(this)
  }


  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()
    let id_edit = this.props.match.params.id
    axios.put('/api/turno/'+id_edit,this.state).then(res => {
      this.returnBackOnClick()
    }).catch(err => {
      console.log(err)
    })
  }

  returnBackOnClick(e){
    this.props.history.push('/turno')
  }

  componentDidMount(){
    axios.get('/api/turno/'+this.props.match.params.id).then(res => {
      Object.keys(this.state).forEach((v,i) => {
        this.setState({
          [v]: res.data[v]
        })
      })
    }).catch(err => {

    })
  }

  render () {
    const {turno,desde,hasta} = this.state
    return(
      <div className="card">
        <div className="card-header">
          <h5 className="card-tilte">Editar Turno</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="turno"
                type="text"
                label="Nombre Turno"
                requerido={true}
                onChange={this.onChange}
                value={turno}
              />
            </div>
            <div className="row">
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="desde"
                type="time"
                label="Desde"
                requerido={true}
                onChange={this.onChange}
                value={desde}
              />
              <FormGroup
                cols="col-md-6 col-sm-6"
                id="hasta"
                type="time"
                label="Hasta"
                requerido={true}
                onChange={this.onChange}
                value={hasta}
              />
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 offset-md-3 offset-sm-3">
                <Button color="secondary" type="button" onClick={this.returnBackOnClick} block>Volver</Button>
              </div>
              <div className="col-md-3 col-sm-3">
                <Button type="submit" color="primary" block>Editar</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditTurno;
