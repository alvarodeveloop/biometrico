import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './views/Home'

/* generales */
import Login from './views/Login'
import App from './components/App'
import NotFound from './views/NotFound'
import Authenticated from './components/Auth/Guest'
import Asistencia from './views/Asistencia'
import Reporte from './views/Reporte'
import Perfil from './views/Perfil'

/* componentes de master */
import Ente from './views/Ente'
import EnteAssit from './views/EnteAssit'
import AssistByEnte from './views/AssistByEnte'
import EditEnte from './views/Edit/EditEnte'
import Cargo from './views/Cargo'
import EditCargo from './views/Edit/EditCargo'

/* componentes de administrador */
import Departamento from './views/Departamento'
import EditDepartamento from './views/Edit/EditDepartamento'
import Config from './views/Config'

/* componentes de director */
import Turno from './views/Turno'
import EditTurno from './views/Edit/EditTurno'
import Trabajador from './views/Trabajador'
import EditTrabajador from './views/Edit/EditTrabajador'
import TakeAssist from './views/TakeAssist'


const user = localStorage.getItem('user')

export const AppRoutes = () =>

  <App>
    <Switch>
      <Route exact path="/" component={Login}  />
      <Route path="/asistencia" component={Authenticated(Asistencia)}  />
      <Route path="/home" component={Authenticated(Home)}  />
      <Route path="/reporte" component={Authenticated(Reporte)}  />
      <Route path="/perfil" component={Authenticated(Perfil)}  />


      /*rutas master */
      <Route exact path="/ente" component={Authenticated(Ente)}  />
      <Route exact path="/ente/asistencia" component={Authenticated(EnteAssit)}  />
      <Route exact path="/ente/asistencia/:id" component={Authenticated(AssistByEnte)}  />
      <Route path="/editEnte/:id" component={Authenticated(EditEnte)}  />
      <Route path="/cargo" component={Authenticated(Cargo)}  />
      <Route path="/editCargo/:id" component={Authenticated(EditCargo)}  />


      /* rutas administrador */
      <Route path="/departamento" component={Authenticated(Departamento)} />
      <Route path="/editDepartamento/:id" component={Authenticated(EditDepartamento)} />
      <Route path="/config" component={Authenticated(Config)} />


    /* rutas directores */
      <Route path="/trabajador" component={Authenticated(Trabajador)}  />
      <Route path="/editTrabajador/:id" component={Authenticated(EditTrabajador)}  />
      <Route path="/turno" component={Authenticated(Turno)}  />
      <Route path="/editTurno/:id" component={Authenticated(EditTurno)}  />
      <Route path="/tomarAsistencia" component={Authenticated(TakeAssist)}  />
      <Route component={NotFound}  />
    </Switch>
  </App>
