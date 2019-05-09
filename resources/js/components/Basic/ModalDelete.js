import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'


class ModalForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      isOpen : false
    }

    this.toggle = this.toggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount(){
    if(this.props.openModal){
        this.toggle()
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.openModal){
        this.toggle()
    }
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
    if(!this.state.isOpen){
      this.props.closeModal()
    }
  }

  handleDelete(e){
    e.preventDefault()
    this.props.onDelete()
    this.toggle()
  }

  render(){
    return(
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Eliminar Registro</ModalHeader>
            <ModalBody>
              <h3 className="text-center">¿Esta seguro de querer eliminar este Registro?</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleDelete}>Eliminar</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

ModalForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalForm
