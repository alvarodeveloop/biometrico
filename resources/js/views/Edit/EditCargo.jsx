import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import FormGroup from '../../components/Basic/FormGroup'
import { Button } from 'reactstrap'

class EditCargo extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      cargo: "",
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
    axios.put('/api/cargo/'+id_edit,this.state).then(res => {
      this.returnBackOnClick()
    }).catch(err => {
      console.log(err)
    })
  }

  returnBackOnClick(e){
    this.props.history.push('/cargo')
  }

  componentDidMount(){
    axios.get('/api/cargo/'+this.props.match.params.id).then(res => {
      this.setState({
        cargo : res.data.cargo
      })

    }).catch(err => {

    })
  }

  render () {

    const {cargo} = this.state

    return(
      <div className="card">
        <div className="card-header">
          <h5 className="card-tilte">Editar Cargo</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <FormGroup
                cols="col-md-12 col-sm-12"
                id="cargo"
                type="text"
                label="Nombre Cargo"
                requerido={true}
                onChange={this.onChange}
                value={cargo}
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

export default EditCargo;
