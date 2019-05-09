import React from 'react'
import PropTypes from 'prop-types'

class FormGroup extends React.Component{

  constructor(props){
    super(props)

  }

  render(){

    const {cols,label,requerido,id,onChange,type,value,options} = this.props

    return(
      <div className={'form-group '+cols}>
        <label className="form-control-label">{ label }</label>
        {type === 'textarea' ? (
          <textarea className="form-control" id={id} required={requerido} onChange={onChange} value={value}>
          </textarea>
        ) : type === 'select' ? (
          <select id={id} onChange={onChange} value={value} options={options} className="form-control" required={requerido}>
            <option value="" disabled>--Seleccione--</option>
            {options.map((v,k) => <option key={k} value={v.value}>{v.label}</option> ) }
          </select>
        ) : (
          <input id={id} type={type} required={requerido} onChange={onChange} className="form-control" value={value} />
        )}
      </div>
    )
  }
}

FormGroup.propTypes = {
  cols: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  requerido: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string || PropTypes.number,
  options: PropTypes.array
}

export default FormGroup
