import React from 'react'
import PropTypes from 'prop-types'
import { map, orderBy, uniq, forEach } from 'lodash'

export default PaginatedComponent => {


  class Paginator extends React.Component
  {

  	constructor(props) {
  		super(props);

  		this.onClick = this.onClick.bind(this);

      this.filterByQueryOnChange = this.filterByQueryOnChange.bind(this)
      this.sortTableOnChange = this.sortTableOnChange.bind(this)

        this.state = {
          // Comenzamos en la página 0. Necesitamos almacenar la página actual
          page: 0,
          filter: "",
          tbody_new : [],
          order: "",
          indexOrder: 0
        }

      }

      /**
       * Recibimos nuevas propiedades
       */
      async componentWillReceiveProps(nextProps) {

        // Tenemos que comprobar si los datos son distintos y si seguimos viéndolos
        // por pantalla. Si no, forzamos la página a 0

        let page = this.state.page,
            filter = this.state.filter,
            indexOrder = this.state.indexOrder,
            order = this.state.order


        if (nextProps.tbody.length / this.props.itemsPerPage < page) {
          page = 0;
        }
        // Comprobamos si ha cambiado algo
        if (page !== this.state.page) {
          this.setState({ page });
        }

        if(filter !== nextProps.filterQuery){
          await this.setState({ filter: nextProps.filterQuery });
          let registers = this.sortTableOnChange(nextProps.indexSortable,nextProps.orderSortable,nextProps.tbody)

          await this.setState({
            tbody_new: registers
          });

        }else{

          let registers = this.sortTableOnChange(nextProps.indexSortable,nextProps.orderSortable,nextProps.tbody)
          await this.setState({
            tbody_new: registers ,
            indexOrder: nextProps.indexSortable,
            order: nextProps.indexSortable === "" ? "" : nextProps.orderSortable
          });

        }
      }

      /**
       * Actualizamos la página actual.
       */
      onClick(e, page) {
        // Evitamos que el link funcione
        e.preventDefault();
        // Comprobamos si ha cambiado la página y actualizamos
        if (page !== this.state.page) {
          this.setState({ page });
        }
      }

      filterByQueryOnChange(body){

        if(this.state.filter.length > 0){

          let { filter } = this.state

  				filter = filter.toLowerCase()
          let registers = []

  				forEach(body,(e1,k1) =>{

  					forEach(this.props.tbody_key,(v,k) =>{

  						let string = e1[v] ? e1[v].toString().toLowerCase() : ''

  							if(v === 'activo'){
  								if(string === 'true'){

  									let string1 = 'activo';

  									if(string1.indexOf(filter) !== -1){

  										registers.push(e1)
  									}
  								}else{
  									let string1 = 'desactivado';

  									if(string1.indexOf(filter) !== -1){

  										registers.push(e1)
  									}
  								}
  							}else{
  								if(string.indexOf(filter) !== -1){

  									registers.push(e1)
  								}
  							}

  					})

  				})
          return uniq(registers)
  			}else{
           return body
  			}
      }

      sortTableOnChange(index,order,body){

        if(index === ""){

          return this.filterByQueryOnChange(body)
  			}else{
  			 	let field = this.props.tbody_key[index]

  			 	let tbody = orderBy(this.filterByQueryOnChange(body),o =>{

  			 		if(field === 'activo'){

  			 			let string = o[field].toString().toLowerCase()
  			 			if(string === 'false'){
  			 				return 'desactivado'
  			 			}else{
  			 				return 'activado'
  			 			}
  			 		}else{
  			 			if(isNaN(o[field])){
  			 				return o[field].toString().toLowerCase()
  			 			}else{
  			 				return parseFloat(o[field])
  			 			}
  			 		}
  			 	},[order])

          return tbody
  			}
      }
      /**
       * Mostramos la paginación
       */
      renderPagination() {
        let tbody = this.state.tbody_new
        let min = 0
        let max = 0

        let numberPages = Math.ceil(tbody.length / this.props.itemsPerPage),
          pages = [];

        // Create links
        if (numberPages > 1){
          if(this.state.page > 0){
            min = this.state.page - 1
          }
          if(this.state.page < numberPages - 1){
              max = this.state.page + 1
          }

          pages.push(
            <a href="#" className='Paginator__Page' key={'unique'} onClick={(e) => this.onClick(e, 0)}>
              &laquo;
            </a>
          )

          for(let i = min; i < numberPages; i++) {
            // Podemos agregar elementos JSX a nuestro array. Recrodad que en
            // última instancia, son llamadas al método React.createElement
            let cssClass = "Paginator__Page";
            cssClass = i === this.state.page ? `${ cssClass } Paginator__Page--active` : cssClass;

            pages.push(
              <a href="#" className={ cssClass } key={i} onClick={(e) => this.onClick(e, i)}>
                {i + 1}
              </a>
            )
          }

          pages.push(
            <a href="#" className='Paginator__Page' key={'unique'} onClick={(e) => this.onClick(e, numberPages - 1)}>
              &raquo;
            </a>
          )
        }
        // Englobamos todos los elementos en uno
        return pages
      }

      /**
       * Obtenemos los datos que hay que mostrar
       */
      pageData() {
        let data = [];
        let tbody = this.state.tbody_new


        if (tbody.length > 0) {
          data = tbody.slice(this.state.page * this.props.itemsPerPage,
            (this.state.page + 1) * this.props.itemsPerPage);
        }

        return data;
      }

      // Renderizamos el componente con nuevos props!
      render() {
        // Creamos una copia. No podemos modificar los props originales!!

        let paginatedProps = Object.assign({}, this.props,
          { tbody: this.pageData(), pagination:this.renderPagination()  });

        return <PaginatedComponent {...paginatedProps} />
  	}
  }

  Paginator.propTypes = {
		itemsPerPage : PropTypes.string.isRequired,
		tbody        : PropTypes.array.isRequired,
    tbody_key    : PropTypes.array.isRequired,
    filterQuery  : PropTypes.string.isRequired,
    orderSortable: PropTypes.string.isRequired,
    indexSortable: PropTypes.string.isRequired,
	}

  return Paginator
}
