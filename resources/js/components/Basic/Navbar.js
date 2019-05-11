import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../action/Auth'
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import axios from 'axios'

class Navbar extends React.Component{

  constructor(props){
    super(props)
    this.cerrarSesion = this.cerrarSesion.bind(this)
    this.makeNavbars = this.makeNavbars.bind(this)
  }

  cerrarSesion(e){
    e.preventDefault()
    localStorage.removeItem('token')
    axios.post('/api/auth/logout').then(res => {
      setAuthorizationToken(null)
      this.props.logout()
    })

  }

  makeNavbars(id_perfil){

    const ulLogout = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
            <i className="fas fa-sign-out-alt"></i>
            Extra
          </a>
          <div className="dropdown-menu">
            <NavLink className="dropdown-item" to="/perfil">
              Perfil
            </NavLink>
            <a className="dropdown-item" href="#" onClick={this.cerrarSesion}>Cerrar Sesión</a>
          </div>
        </li>
      </ul>

    )

    const asistencia = (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          <i className="fas fa-chart-line"></i>
          Asistencia
        </a>
        <div className="dropdown-menu">
          <NavLink className="dropdown-item" to={ id_perfil == 1 ? "/ente/asistencia" : "/asistencia" }>
            Panel Asistencia
          </NavLink>
          <NavLink className="dropdown-item" to="/reporte">
            Reporte
          </NavLink>
        </div>
      </li>
    )

    const masterRoutes = (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Logo</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <i className="fas fa-tachometer-alt"></i>
              Escritorio
              <span className="bot-line"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/ente" className="nav-link">
              <i className="fas fa-building"></i>
              Registrar Ente
              <span className="bot-line"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trabajador" className="nav-link">
              <i className="fas fa-user"></i>
              Reportes
              <span className="bot-line"></span>
            </NavLink>
          </li>
          { asistencia }
        </ul>
        { ulLogout }
      </nav>
    )

    const administratorRoutes = (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Logo</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <i className="fas fa-tachometer-alt"></i>
              Escritorio
              <span className="bot-line"></span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              <i className="fa fa-user"></i>
              Cargos y <br/> Departamentos
            </a>
            <div className="dropdown-menu">
              <NavLink to="/departamento" className="dropdown-item">
                Departamento
                <span className="bot-line"></span>
              </NavLink>
              <NavLink to="/cargo" className="dropdown-item">
                Cargos
                <span className="bot-line"></span>
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink to="/turno" className="nav-link">
              <i className="fas fa-clock"></i>
              Turno
              <span className="bot-line"></span>
            </NavLink>
          </li>
          { asistencia }
          <li className="nav-item">
            <NavLink to="/config" className="nav-link">
              <i className="fas fa-cogs"></i>
              Configuración
              <span className="bot-line"></span>
            </NavLink>
          </li>
        </ul>
        { ulLogout }
      </nav>
    )

    const directorRoute = (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Logo</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <i className="fas fa-tachometer-alt"></i>
              Escritorio
              <span className="bot-line"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tomarAsistencia" className="nav-link">
              <i className="fas fa-camera"></i>
              Tomar Asistencia
              <span className="bot-line"></span>
            </NavLink>
          </li>
          { asistencia }
          <li className="nav-item">
            <NavLink to="/trabajador" className="nav-link">
              <i className="fas fa-user"></i>
              Trabajador
              <span className="bot-line"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/turno" className="nav-link">
              <i className="fas fa-clock"></i>
              Turno
              <span className="bot-line"></span>
            </NavLink>
          </li>
        </ul>
        { ulLogout }
      </nav>
    )

    const loginRoute = (

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Logo</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <i className="fas fa-tachometer-alt"></i>
              Iniciar Sesisón
              <span className="bot-line"></span>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/recuperar_contra" className="nav-link">
              <i className="fas fa-user"></i>
              Recuperar Contraseña
              <span className="bot-line"></span>
            </NavLink>
          </li>
        </ul>
      </nav>

    )

    if(id_perfil){
      if(id_perfil == 1){
        return masterRoutes
      }else if(id_perfil == 2){
        return administratorRoutes
      }else{
        return directorRoute
      }
    }else{
      return loginRoute
    }
  }

  render(){
    const { id_perfil } = this.props.user
    const ulChild = this.makeNavbars(id_perfil)

    return(
      <div>
        { ulChild }
      </div>
    )
  }
}

Navbar.propTypes = {
  user : PropTypes.object,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
  }
}

function mapDispatchToProps(){
    return {
      logout
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(Navbar)
