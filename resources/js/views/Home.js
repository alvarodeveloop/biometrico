import React, { Component } from 'react';
import Asistencia from './Asistencia'
import Chart from '../components/Basic/Chart'
import PanelAviso from '../components/Basic/PanelAviso'
import { forkJoin } from 'rxjs'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      early: [],
      late: [],
      user: JSON.parse(localStorage.user),
      totalTrabajador: 0,
      totalAsistencia: 0,
      isOpen: false
    }

    this.searchWorker = this.searchWorker.bind(this)
    this.toggle = this.toggle.bind(this)

  }

  componentDidMount(){
    const promises = forkJoin(
        axios.get('/api/asistencia_chart'),
        axios.get('/api/trabajador'),
        axios.get('/api/asistencia'),
    )

    promises.subscribe(val => {
      this.setState({
        early: val[0].data.early,
        late: val[0].data.late,
        totalTrabajador: val[1].data.length,
        totalAsistencia: val[2].data.length,
      })
    })
  }

  async searchWorker(e){
    e.preventDefault()
    let inputCedula = document.getElementById('cedula')
    if(inputCedula.value){
      await this.setState({
        cedula : inputCedula.value
      })
      this.toggle()
    }else{
      alert('Debe colocar una cédula')
    }
  }

  toggle(e){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

      const {early,late,user,totalTrabajador,totalAsistencia} = this.state

      return (
          <div>
            <br/>
            <div className="row jumbotron">
              <div className="col-md-6 col-sm-6">
                <h3 className="">Bienvenido {user.nombre+' '+user.apellido}</h3>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div className="input-group">
                    <input type="number" id="cedula" className="form-control" placeholder="Ingrese la cédula del trabajador"
                       onChange={this.onChange} />
                    <div className="input-group-addon">
                      <button className="btn btn-primary" onClick={this.searchWorker}><i className="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <PanelAviso
                  title={totalAsistencia.toString()}
                  text="Total Asistencias"
                  fa="fas fa-user"
                  color="green"
                />
              </div>
              <div className="col-md-3 col-sm-3">
                <PanelAviso
                  title=""
                  text="Reportes"
                  fa="fas fa-file"
                  color="blue"
                  link="/reporte"
                  history={this.props.history}
                />
              </div>
              <div className="col-md-3 col-sm-3">
                <PanelAviso
                  title=""
                  text="Perfil"
                  fa="fas fa-user"
                  color="orange"
                  link="/perfil"
                  history={this.props.history}
                />
              </div>
              <div className="col-md-3 col-sm-3">
                <PanelAviso
                  title={totalTrabajador.toString()}
                  text="Total Trabajadores"
                  fa="fas fa-users"
                  link="/trabajador"
                  history={this.props.history}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <Chart type="pie" data={late} color="#D91424" title={'Los 5 más retrasados'} />
              </div>
              <div className="col-md-4 col-sm-4">

              </div>
              <div className="col-md-4 col-sm-4">
                <Chart type="area" data={early} color="#14D9D6" title={'Los 5 más a tiempo'} />
              </div>
            </div>
            <br/><br/>
            <h4>Asistencia del Día</h4>
            <Asistencia byDay={true} />

          <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-xl">
              <ModalHeader toggle={this.toggle}>Asistencia por Trabajador</ModalHeader>
                <ModalBody>
                  <Asistencia hideFilter={false} cedulaWorker={this.state.cedula} />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>

          </div>
      );
  }
}
