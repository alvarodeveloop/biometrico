import React from 'react'
import FormGroup from '../Basic/FormGroup'
import axios from 'axios'
import PropTypes from 'prop-types'
import ModalForm from '../Basic/ModalForm'

class CargoForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      cargo: "",
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fieldForm = this.fieldForm.bind(this)
    this.clear = this.clear.bind(this)

  }

  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(){
    return axios.post('/api/cargo',this.state)
  }

  clear(){
    Object.keys(this.state).forEach((v,k) => {
      this.setState({
        [v] : ""
      })
    })
  }

  fieldForm(){

    const {cargo} = this.state

    return(
      <div>
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
      </div>
    )
  }

  render () {
    const formHtml = this.fieldForm()

    return(
      <ModalForm
        onSubmit={this.onSubmit}
        color="primary"
        label="Crear Cargo"
        modalClass="modal-lg"
        modalTitle="Formulario de Cargo"
        modalBody={formHtml}
        block={true}
        onSubmit={this.onSubmit}
        get={this.props.get}
        clear={this.clear}
      />
    )
  }
}

CargoForm.propTypes = {
  get: PropTypes.func.isRequired
}

export default CargoForm;
