import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../components/Basic/FormGroup'
import axios from 'axios'
import pdfMake from '../utils/pdfAsistencia'


class Reporte extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      desde: "",
      hasta: "",
      id_trabajador: "",
      status: "",
      llegada: "",
      optionTrabajador: [],
      optionStatus: [
        {  value: '', label: 'Todos' },
        {  value: 0, label: 'Temprano' },
        {  value: 1, label: 'Normal' },
        {  value: 2, label: 'Tarde' },
      ],
      optionLlegada: [
        {  value: '', label: 'Todos' },
        {  value: false, label: 'Entrada' },
        {  value: true, label: 'Salida' },
      ],
      showAdvice: false,
      texto: "Generar"
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  async onChange(e){
    await this.setState({
      [e.target.id] : e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault()
    let filter = Object.assign({},this.state)
    delete filter.optionTrabajador
    delete filter.optionStatus
    delete filter.optionLlegada

    this.setState({
      texto: "Generando..."
    });

    axios.post('/api/reporte/general',filter).then(res => {
      if(res.data.length > 0){
        this.setState({
          showAdvice : false
        });

        pdfMake(res.data,JSON.parse(localStorage.user)).then(res => {
          this.setState({
            texto: "Generar"
          });
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.setState({
          showAdvice : true,
          texto: "Generar"
        });

      }
    }).catch(err =>{
      console.log(err)
    })
  }

  componentWillMount(){
    axios.get('/api/trabajador').then(res => {

      if(res.data.length > 0){
        res.data.unshift(
          {  value: '', label: 'Todos' },
        )
      }

      this.setState({
        optionTrabajador: res.data
      });
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    const { optionStatus,desde,hasta,id_trabajador,status,optionTrabajador, optionLlegada, llegada } = this.state

    return(
      <div className="card">
        <div className="card-header">
          <h3>Reporte de Asistencias</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <FormGroup
                id="desde"
                cols="col-md-6 col-sm-6"
                type="date"
                label="Desde"
                requerido={false}
                onChange={this.onChange}
                value={desde}
                />
              <FormGroup
                id="hasta"
                cols="col-md-6 col-sm-6"
                type="date"
                label="Hasta"
                requerido={false}
                onChange={this.onChange}
                value={hasta}
                />
            </div>
            <div className="row">
              <FormGroup
                id="id_trabajador"
                cols="col-md-6 col-sm-6"
                type="select"
                label="Trabajador"
                requerido={false}
                onChange={this.onChange}
                value={id_trabajador}
                options={optionTrabajador}
                />
              <FormGroup
                id="status"
                cols="col-md-6 col-sm-6"
                type="select"
                label="Estatus"
                requerido={false}
                onChange={this.onChange}
                value={status}
                options={optionStatus}
                />
            </div>
            <div className="row">
              <FormGroup
                id="llegada"
                cols="col-md-6 col-sm-6"
                type="select"
                label="Tipo"
                requerido={false}
                onChange={this.onChange}
                value={llegada}
                options={optionLlegada}
                />
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 offset-md-3 offset-sm-3">
                <button type="submit" className="btn btn-primary btn-block">{this.state.texto}</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <br/>
                {this.state.showAdvice ? (
                  <p className="text-center alert alert-danger">No hay datos para el reporte</p>
                ) : ''}
              </div>
            </div>
          </form>
        </div>
      </div>

    )
  }
}

export default Reporte;
