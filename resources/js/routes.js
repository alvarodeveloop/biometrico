import React from 'react'
import { Route, Switch } from 'react-router-dom'

/* generales */
import Login from './views/Login'
import App from './components/App'
import NotFound from './views/NotFound'
import Authenticated from './components/Auth/Guest'
import Asistencia from './views/Asistencia'

/* componentes de master */
import HomeMaster from './views/HomeMaster'
import Ente from './views/Ente'
import EditEnte from './views/Edit/EditEnte'
import Cargo from './views/Cargo'
import EditCargo from './views/Edit/EditCargo'
//import EditEnte from './views/Edit/Editente'

/* componentes de administrador */
import HomeAdmin from './views/HomeAdmin'
import Departamento from './views/Departamento'
import EditDepartamento from './views/Edit/EditDepartamento'
import Config from './views/Config'

/* componentes de director */

import Home from './views/Home'
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
      <Route exact path="/panelAsistencia" component={Asistencia}  />

      /*rutas master */
      <Route path="/homeMaster" component={Authenticated(HomeMaster)}  />
      <Route path="/ente" component={Authenticated(Ente)}  />
      <Route path="/editEnte/:id" component={Authenticated(EditEnte)}  />
      <Route path="/cargo" component={Authenticated(Cargo)}  />
      <Route path="/editCargo/:id" component={Authenticated(EditCargo)}  />

      /* rutas administrador */
      <Route path="/homeAdmin" component={Authenticated(HomeMaster)}  />
      <Route path="/departamento" component={Authenticated(Departamento)} />
      <Route path="/editDepartamento/:id" component={Authenticated(EditDepartamento)} />
      <Route path="/config" component={Authenticated(Config)} />


    /* rutas directores */
      <Route path="/home" component={Authenticated(Home)}  />
      <Route path="/trabajador" component={Authenticated(Trabajador)}  />
      <Route path="/editTrabajador/:id" component={Authenticated(EditTrabajador)}  />
      <Route path="/turno" component={Authenticated(Turno)}  />
      <Route path="/editTurno/:id" component={Authenticated(EditTurno)}  />
      <Route path="/asistencia" component={Authenticated(TakeAssist)}  />
      <Route component={NotFound}  />
    </Switch>
  </App>
