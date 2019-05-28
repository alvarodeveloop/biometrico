import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import TableEnteAssist from '../components/Basic/TableEnteAssist'
import Spinner from '../components/Basic/Spinner'

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
          tbody_key:['ente'],
          loading: true
        }


    this.onChange = this.onChange.bind(this)
  }

  async onChange(e){
    await this.setState({
       [e.target.id ]: e.target.value
    })
  }

  componentWillMount(){
    axios.get('/api/ente').then(async res => {
      await this.setState({
        loading : false
      });

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
      tbody_key,
      loading
    } = this.state

    return(
      <div>
        { loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <Spinner loading={loading} />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    )
  }
}

export default EnteAssit;
