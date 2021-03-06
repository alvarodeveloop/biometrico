import React from 'react'
import PropTypes from 'prop-types'

class FormGroup extends React.Component{

  constructor(props){
    super(props)

  }

  render(){

    const {cols,label,requerido,id,onChange,type,value,options,disabled} = this.props

    return(
      <div className={'form-group '+cols}>
        <label className="form-control-label">{ label }</label>
        {type === 'textarea' ? (
          <textarea className="form-control" id={id} required={requerido} onChange={onChange} value={value} disabled={disabled}>
          </textarea>
        ) : type === 'select' ? (
          <select id={id} onChange={onChange} value={value} options={options} className="form-control" required={requerido} disabled={disabled}>
            <option value="">--Seleccione--</option>
            {options.map((v,k) => <option key={k} value={v.value}>{v.label}</option> ) }
          </select>
        ) : (
          <input id={id} type={type} required={requerido} onChange={onChange} className="form-control" value={value} disabled={disabled} />
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
  options: PropTypes.array,
  disabled: PropTypes.bool,
}

export default FormGroup
