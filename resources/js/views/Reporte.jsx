import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../components/Basic/FormGroup'
import Spinner from '../components/Basic/Spinner'
import axios from 'axios'
import pdfMake from '../utils/pdfAsistencia'


class Reporte extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id_ente : "",
      id_departamento : "",
      desde: "",
      hasta: "",
      id_trabajador: "",
      status: "",
      llegada: "",
      optionTrabajador: [],
      optionStatus: [
        {  value: 0, label: 'Temprano' },
        {  value: 1, label: 'Normal' },
        {  value: 2, label: 'Tarde' },
      ],
      optionLlegada: [
        {  value: false, label: 'Entrada' },
        {  value: true, label: 'Salida' },
      ],
      showAdvice: false,
      texto: "Generar",
      optionEnte : [],
      optionDepartamento: [],
      user: JSON.parse(localStorage.user),
      loading: true,
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
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
    let user = this.state.user
    let promises
    let actualice
    if(user.id_perfil === 1){
      actualice = 'optionEnte'

       promises = [
        axios.get('/api/ente'),
      ]
    }else if(user.id_perfil === 2){
      actualice = 'optionDepartamento'
      promises =[
       axios.get('/api/departamento'),
     ]
   }else{
     actualice = 'optionTrabajador'
     promises = [
      axios.get('/api/trabajador'),
    ]
   }

   Promise.all(promises).then(async res => {
     await this.setState({
       loading : false
     });

     this.setState({
       [actualice]: res[0].data,
     })
   })
  }

  onChangeSelect(e){
    let id = e.target.id
    let value = e.target.value
    if(id === "id_ente"){
      if(value !== ""){
        axios.get('/api/departamento/by_ente/'+value).then(res => {

          this.setState({
            [id] : value,
            optionDepartamento: res.data
          });
        })
      }else{
        this.setState({
          [id] : value,
          id_departamento: "",
          optionDepartamento: []
        });
      }
    }else if(id === "id_departamento"){
      if(value !== ""){
        axios.get('/api/trabajador/by_departamento/'+value).then(res => {

          this.setState({
            [id] : value,
            optionTrabajador: res.data
          });
        })
      }else{
        this.setState({
          [id] : value,
          id_trabajador: "",
          optionTrabajador: []
        });
      }
    }
  }

  render () {
    const { optionStatus,desde,hasta,id_trabajador,
          status,optionTrabajador,
          optionLlegada, llegada,
          id_ente,id_departamento,
          optionEnte, optionDepartamento,user,
          loading
         } = this.state

    return(
      <div>
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
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
                    id="llegada"
                    cols="col-md-6 col-sm-6"
                    type="select"
                    label="Tipo"
                    requerido={false}
                    onChange={this.onChange}
                    value={llegada}
                    options={optionLlegada}
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
                {user.id_perfil == 1 ? (
                  <div className="row">
                    <FormGroup
                      id="id_ente"
                      cols="col-md-6 col-sm-6"
                      type="select"
                      label="Ente"
                      requerido={false}
                      onChange={this.onChangeSelect}
                      value={id_ente}
                      options={optionEnte}

                      />

                      <FormGroup
                        id="id_departamento"
                        cols="col-md-6 col-sm-6"
                        type="select"
                        label="Departamento"
                        requerido={false}
                        onChange={this.onChangeSelect}
                        value={id_departamento}
                        options={optionDepartamento}
                        />
                    </div>
                ) : user.id_perfil < 3 ? (
                  <div className="row">
                    <FormGroup
                      id="id_departamento"
                      cols="col-md-12 col-sm-12"
                      type="select"
                      label="Departamento"
                      requerido={false}
                      onChange={this.onChangeSelect}
                      value={id_departamento}
                      options={optionDepartamento}
                    />
                  </div>
                ) : (null)}
                <div className="row">
                  <FormGroup
                    id="id_trabajador"
                    cols="col-md-12 col-sm-12"
                    type="select"
                    label="Trabajador"
                    requerido={false}
                    onChange={this.onChange}
                    value={id_trabajador}
                    options={optionTrabajador}
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
        )}
      </div>


    )
  }
}

export default Reporte;
