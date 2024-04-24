import React from 'react'
import { Switch, Route } from 'wouter'
import Inicio from './Inicio'
import Simulador from './Simulador'

export default function GlobalRouter () {
  return (
    <Switch>
      <Route path='/inicio' component={Inicio} />
      <Route path='/simulador/:idTablet'>
        {(params) =>  <Simulador params={params.idTablet} />}
      </Route>
      {/* // * Ruta predeterminada * */}
      <Route>
        <Inicio />
      </Route>
    </Switch>
  )
}
