import React, { Component } from 'react';
import Asistencia from './Asistencia'
import Chart from '../components/Basic/Chart'
import PanelAviso from '../components/Basic/PanelAviso'
import { forkJoin } from 'rxjs'

export default class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      early: [],
      late: [],
      user: JSON.parse(localStorage.user),
      totalTrabajador: 0,
      totalAsistencia: 0
    }
  }

  componentWillMount(){
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

  render() {

      const {early,late,user,totalTrabajador,totalAsistencia} = this.state

      return (
          <div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <h3 className="text-center">Bienvenido {user.nombre+' '+user.apellido}</h3>
              </div>
              <div className="col-md-6 col-sm-6">
              </div>
            </div>
            <br/>
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
            <Asistencia byDay={true} />
          </div>
      );
  }
}
