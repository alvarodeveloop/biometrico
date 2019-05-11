import React from 'react'
import { map } from 'lodash'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import './css/Pagination.css'
import { Link } from 'react-router-dom'

class TableEnteAssist extends React.Component{

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
    const {thead,tbody,tbody_key,indexSortable,orderSortable,itemsPerPage,enteAssitRoute} = this.props
    return(
    	<div className="card">
    			<div className="card-header">
            <div className="row">
              <div className="col-md-12">
                <h3>Escoger Ente</h3>
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
                                return <td key={k1}>{v[v1]}</td>
                              })

                            }
                            <td>
                                <Link to={enteAssitRoute+v.id} className="btn btn-primary btn-block">Ver</Link>
                            </td>
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

TableEnteAssist.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody: PropTypes.array.isRequired,
  tbody_key: PropTypes.array.isRequired,
  filterQueryOnChange: PropTypes.func.isRequired,
  filterQuery: PropTypes.string.isRequired,
  indexSortable: PropTypes.string.isRequired,
  orderSortable: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.string.isRequired,
  pagination: PropTypes.array.isRequired,
  enteAssitRoute: PropTypes.string.isRequired,
}

export default Pagination(TableEnteAssist)
