import React from 'react'
import { map } from 'lodash'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import './css/Pagination.css'
import { Link } from 'react-router-dom'

class TableComponent extends React.Component{

  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
  }

  onChange(e){
    this.props.filterQueryOnChange(e)
  }

  handleModalOpen(id){
    this.props.modalOpen(id)
  }

  render(){
    const {thead,tbody,tbody_key,indexSortable,orderSortable,itemsPerPage,pathImage} = this.props
    return(
    	<div className="card">
    			<div className="card-header">
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

                    {map(thead,(v,k) =>{
                      if(this.props.hideEdit && this.props.hideDelete && v === "Acción"){
                        return null
                      }else {
                        return <th className="text-center" key={k}><b>{v}</b></th>
                      }
                    })}
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
                                        <img src={pathImage+v[v1]} width="50px" />
                                      </a>
                                    </td>
                                  }else{
                                    return <td key={k1}></td>
                                  }
                                }else{
                                  return <td key={k1}>{v[v1]}</td>
                                }
                              })

                            }
                          {this.props.hideEdit && this.props.hideDelete ? (null) : (
                            <td>

                              <button type="button" className="btn btn-danger btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>
                              <div className="dropdown-menu">
                                {this.props.hideEdit ? '' : (
                                  <Link to={this.props.editRoute+v.id} className="dropdown-item">Editar</Link>
                                )}

                                {this.props.hideDelete ? '' : (
                                  <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.handleModalOpen(v.id)}>Eliminar</a>
                                )}
                              </div>
                            </td>
                          )}
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

TableComponent.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody: PropTypes.array.isRequired,
  tbody_key: PropTypes.array.isRequired,
  filterQueryOnChange: PropTypes.func.isRequired,
  filterQuery: PropTypes.string.isRequired,
  indexSortable: PropTypes.string.isRequired,
  orderSortable: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired,
  pagination: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
  editRoute: PropTypes.string.isRequired,
  pathImage: PropTypes.string,
  hideEdit: PropTypes.bool,
  hideDelete: PropTypes.bool,
}

export default Pagination(TableComponent)
