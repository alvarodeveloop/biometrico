
import React from 'react'
import PropTypes from 'prop-types'
import TableComponentAssist from './TableComponentAssist'

class WrappedTableAssist extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      numberPerPage: 10,
      filterQuery: "",
      indexSortable: "",
      orderSortable: "",
      itemsPerPage : '10',
      tbody: [],
      openModal: false,
      idDelete: 0
    }

    this.onChange = this.onChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)


  }

  componentWillReceiveProps(nextProps){
    this.setState({
      tbody : nextProps.tbody_original,
    })
  }

  async onChange(e){
    await this.setState({
       [e.target.id ]: e.target.value
    })
  }

  handleOpenModal(id){
      this.setState({
        openModal: !this.state.openModal,
        idDelete: id
      })
  }

  closeModal(){
    this.setState({
      openModal: false,
    })
  }

  handleDelete(){
    this.props.delete(this.state.idDelete)
  }

  render(){
    const { pathImage, tbody, filterQuery, indexSortable, orderSortable, itemsPerPage } = this.state

    return(
      <div className={this.props.cols}>

        <TableComponentAssist
          {...this.props}
          tbody={tbody}
          filterQueryOnChange={this.onChange}
          filterQuery={filterQuery}
          indexSortable={indexSortable}
          orderSortable={orderSortable}
          itemsPerPage={itemsPerPage}
          pathImage={this.props.pathImage}
          searchByPeriod={this.props.searchByPeriod}
        />
      </div>
    )
  }

}

WrappedTableAssist.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody_original: PropTypes.array.isRequired,
  tbody_key: PropTypes.array.isRequired,
  cols: PropTypes.string.isRequired,
  pathImage: PropTypes.string,
  searchByPeriod: PropTypes.func.isRequired
}

export default WrappedTableAssist
