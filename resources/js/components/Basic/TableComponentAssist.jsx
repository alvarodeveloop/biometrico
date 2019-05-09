import React from 'react'
import { map } from 'lodash'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import './css/Pagination.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import FormGroup from './FormGroup'

class TableComponentAssist extends React.Component{

  constructor(props){
    super(props)

    this.state ={
      desde: '',
      hasta: ''
    }

    this.onChange = this.onChange.bind(this)
    this.searchByPeriod = this.searchByPeriod.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  onChange(e){
    this.props.filterQueryOnChange(e)
  }

  handleOnChange(e){
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  searchByPeriod(e){
    e.preventDefault()
    this.props.searchByPeriod(this.state)
  }

  render(){
    const {thead,tbody,tbody_key,indexSortable,orderSortable,itemsPerPage,pathImage} = this.props
    return(
    	<div className="card">
    			<div className="card-header">
            <div className="row">
              <FormGroup
                cols="col-md-4 col-sm-4"
                id="desde"
                type="date"
                label="Desde"
                requerido={false}
                onChange={this.handleOnChange}
                value={this.state.desde}
              />
              <FormGroup
                cols="col-md-4 col-sm-4"
                id="hasta"
                type="date"
                label="Hasta"
                requerido={false}
                onChange={this.handleOnChange}
                value={this.state.hasta}
              />
              <div className="col-md-4 col-sm-4">
                <br/>
                <Button color="danger" block onClick={this.searchByPeriod}>Buscar</Button>
              </div>
            </div>
            <br/>
    	    	<div className="row">
    	    		<div className="col-md-1">
    	    			<b>Orden:</b>
    	    		</div>
    	    		<div className="col-md-2">
    	    			<select className="form-control" id="indexSortable" onChange={this.onChange} value={indexSortable}>
    	    				<option value="">Sin Orden</option>
                  {
                    map(tbody_key,(v1,k1) => {
                      return <option value={k1} key={k1}>{v1}</option>
                    })
                  }
    	    			</select>
    	    		</div>
    	    		<div className="col-md-1">
    	    			<select className="form-control" id="orderSortable" onChange={this.onChange} value={orderSortable}>
    	    				<option value=""></option>
    	    				<option value="asc">Ascendente</option>
    	    				<option value="desc">Descendente</option>
    	    			</select>
    	    		</div>
    	    		<div className="col-md-4">
    	    			<input id="filterQuery" type="text" className="form-control" placeholder="filtrar registros" onChange={this.onChange} />
    	    		</div>
    	    		<div className="col-md-1">
    	    			<b>Límite</b>
    	    		</div>
    	    		<div className="col-md-2">
    	    			<select className="form-control" value={itemsPerPage} id="itemsPerPage" onChange={this.onChange}>
    	    				<option value="10">Defecto</option>
                  <option value="1">1</option>
    	    				<option value="5">5</option>
    	    				<option value="25">25</option>
    	    				<option value="50">50</option>
    	    				<option value="100">100</option>
    	    			</select>
    	    		</div>
    	    	</div>
    			</div>
    	    <div className="card-body">
    	    	<br/>
    	      <div className="table-responsive">
    	        <table id="" className="table table-bordered">
    	        	<thead className="thead-dark">
                  <tr>
                    {map(thead,(v,k) => <th className="text-center" key={k}><b>{v}</b></th>)}
                  </tr>
    	        	</thead>
    	        	<tbody className="text-center">
                  {
                    tbody.length > 0 ? (
                      map(tbody,(v,k) => {
                        return(
                          <tr key={k}>
                            {
                              map(tbody_key,(v1,k1) => {
                                if(v1 === "imagen" || v1 === "qrcode"){
                                  if(v[v1]){
                                    return <td key={k1}>
                                      <a target="_blank" href={pathImage+v[v1]}>
                                        <img src={pathImage+v[v1]} width="70px" />
                                      </a>
                                    </td>
                                  }else{
                                    return <td key={k1}></td>
                                  }
                                }else if(v1 === "llegada" && v.tipo === "Salida"){

                                  switch (v[v1]) {
                                    case 'Temprano':
                                      return <td className="alert alert-danger" key={k1}>{v[v1]}</td>
                                    break;
                                    case 'Normal':
                                      return <td className="" key={k1}>{v[v1]}</td>
                                    break;
                                    case 'Tarde':
                                      return <td className="alert alert-success" key={k1}>{v[v1]}</td>
                                    break;
                                  }
                                }else if(v1 === "llegada" && v.tipo === "Entrada"){
                                  switch (v[v1]) {
                                    case 'Temprano':
                                      return <td className="alert alert-success" key={k1}>{v[v1]}</td>
                                    break;
                                    case 'Normal':
                                      return <td className="" key={k1}>{v[v1]}</td>
                                    break;
                                    case 'Tarde':
                                      return <td className="alert alert-danger" key={k1}>{v[v1]}</td>
                                    break;
                                  }
                                }else{
                                  return <td key={k1}>{v[v1]}</td>
                                }
                              })

                            }
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={thead.length}>No existen Registros todavía</td>
                      </tr>
                    )
                  }
    	        	</tbody>
    	        </table>
              <section className="Paginator">
                <div className="Paginator__Pagination">
                { this.props.pagination }
                </div>
              </section>
    	      </div>
    	    </div>
    	  </div>
    )
  }
}

TableComponentAssist.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody: PropTypes.array.isRequired,
  tbody_key: PropTypes.array.isRequired,
  filterQueryOnChange: PropTypes.func.isRequired,
  filterQuery: PropTypes.string.isRequired,
  indexSortable: PropTypes.string.isRequired,
  orderSortable: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.string.isRequired,
  pagination: PropTypes.array.isRequired,
  pathImage: PropTypes.string,
  searchByPeriod: PropTypes.func.isRequired
}

export default Pagination(TableComponentAssist)
