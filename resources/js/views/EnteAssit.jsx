import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import TableEnteAssist from '../components/Basic/TableEnteAssist'

class EnteAssit extends React.Component {

  constructor(props){
    super(props)

        this.state = {
          numberPerPage: 10,
          filterQuery: "",
          indexSortable: "",
          orderSortable: "",
          itemsPerPage : '10',
          thead:['Ente','Acción'],
          tbody:[],
          tbody_key:['ente']
        }


    this.onChange = this.onChange.bind(this)
  }

  async onChange(e){
    await this.setState({
       [e.target.id ]: e.target.value
    })
  }

  componentWillMount(){
    axios.get('/api/ente').then(res => {
      this.setState({
        tbody : res.data
      });
    })
  }

  render () {
    const { numberPerPage, filterQuery, indexSortable,
      orderSortable,
      itemsPerPage,
      thead,
      tbody,
      tbody_key
    } = this.state

    return(
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <TableEnteAssist
            thead={thead}
            tbody={ tbody }
            tbody_key={tbody_key}
            filterQueryOnChange={this.onChange}
            filterQuery={filterQuery}
            indexSortable={indexSortable}
            orderSortable={orderSortable}
            itemsPerPage={itemsPerPage}
            enteAssitRoute={'/ente/asistencia/'}
          />
        </div>
      </div>
    )
  }
}

export default EnteAssit;
