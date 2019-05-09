import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../Basic/FormGroup'
import jwtDecode from 'jwt-decode'
import setAuthorizationToken from '../../utils/setAuthorizationToken'

class LoginForm extends React.Component {

  constructor(props){
      super(props)
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)

      this.state = {
        email: '',
        password: ''
      }
  }

  onChange(e){
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()

    axios.post('/api/auth/login',this.state).then(res => {
      let token = res.data.access_token
      localStorage.setItem('token',token)
      localStorage.setItem('user',JSON.stringify(res.data.user))
      this.props.login(res.data.user)
      setAuthorizationToken(token)
      this.props.redirect()
    }).catch(err => {
      console.log(err)
    })

    /*this.props.login(this.state).then(res => {
      console.log(res)
    }).catch( ({response}) =>{
      console.log(response)
    })*/
  }

  render () {
    return(

      <div className="row">
        <div className="col-md-7 col-sm-7 offset-md-3 offset-sm-3">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Iniciar Sesión</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <FormGroup
                  id="email"
                  cols="col-md-12 col-sm-12"
                  type="text"
                  label="Usuario"
                  requerido={true}
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <FormGroup
                  id="password"
                  cols="col-md-12 col-sm-12"
                  type="password"
                  label="Contraseña"
                  requerido={true}
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <div className="form-group col-md-7 col-sm-7 offset-md-2 offset-sm-2">
                  <button className="btn btn-primary btn-block" type="submit">
                    Inciar Sesión
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>

    )
  }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    redirect:PropTypes.func.isRequired
}

export default LoginForm;
