import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class PanelAviso extends React.Component{
  constructor(props){
    super(props)
    this.redirect = this.redirect.bind(this)
  }

  redirect(){

    if(this.props.link){
      this.props.history.push(this.props.link)
    }
  }

  render(){
    const colores = {
            red:'#fa4251',
            orange: '#ff8300',
            green: '#4CAF50',
            blue: '#00b5e9'
          }

    const { color,title,text,fa } = this.props

    return(
      <div className="panel_aviso" style={{ background: color ? colores[color] : colores.red }} onClick={this.redirect}>
        <h2 className="number">{title}</h2>
        <span className="desc">{text}</span>
        <div className="icon">
            <i className={fa}></i>
        </div>
      </div>
    )
  }
}

PanelAviso.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fa: PropTypes.string.isRequired,
  link: PropTypes.string,
  history: PropTypes.object
}

export default PanelAviso
