import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Reporte from './components/InConsole'
import TablaSimbolos from './components/TablaSimbolos'
import TablaErrores from './components/TablaErrores'

const Routes = () => {
    return (
        <Switch>
            <Route exact path = "/" component={Navigation}/>
            <Route exact path = "/mywebsite" component={Navigation}/>
            <Route exact path = "/mywebsite/reporte" component={Reporte}/>
            <Route exact path = "/mywebsite/reporteTabla" component={TablaSimbolos}/>
            <Route exact path = "/mywebsite/reporteErrores" component={TablaErrores}/>
        </Switch>
    );
}

export default Routes;
