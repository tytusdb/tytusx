import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Reporte from './components/InConsole'

const Routes = () => {
    return (
        <Switch>
            <Route exact path = "/" component={Navigation}/>
            <Route exact path = "/mywebsite" component={Navigation}/>
            <Route exact path = "/mywebsite/reporte" component={Reporte}/>
        </Switch>
    );
}

export default Routes;
