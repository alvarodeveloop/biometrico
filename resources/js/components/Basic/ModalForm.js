import React from 'react'
import map  from 'lodash/map'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'


class ModalForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      isOpen : false,
      error: []
    }

    this.toggle = this.toggle.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onChange(e){

  }

  onSubmit(e){
    e.preventDefault()
    this.props.onSubmit().then(res => {
      this.props.get()
      this.toggle()
      this.props.clear()
      this.setState({
        error: []
      })
    }).catch(({response}) => {
      let errors = []
      if(response.data.errors){

        errors = map(response.data.errors,(v,k) => (<li key={k}>{v[0]}</li>))

        this.setState({
          error: errors
        })
      }

    })

  }

  render(){
    const {color,label,modalClass,modalTitle,modalBody,block} = this.props
    const { error } = this.state
    return(
      <div>
        <button id="modal_form" type="button" className="btn btn-teal btn-block" onClick={this.toggle}>{label}</button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={modalClass}>
          <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              {error.length > 0 ? (
                <div className="alert alert-danger">
                  {error}
                </div>
              ) : ''}
              <br/>
              {modalBody}
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-primary">Guardar</button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}

ModalForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  modalClass: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalBody: PropTypes.element.isRequired,
  block: PropTypes.bool.isRequired,
  get: PropTypes.func.isRequired,
  clear:PropTypes.func.isRequired
}

export default ModalForm
