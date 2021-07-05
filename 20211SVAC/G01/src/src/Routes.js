import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Reporte from './components/InConsole'
import TablaSimbolos from './components/TablaSimbolos'
import TablaErrores from './components/TablaErrores'
import Gramatical  from './components/Gramatical'

const Routes = () => {
    useEffect(()=>{
        document.title="Fase 2 - Grupo 1"
    })
    return (
        <Switch>
            <Route exact path = "/" component={Navigation}/>
            <Route exact path = "/tytusx/20211SVAC/G01" component={Navigation}/>
            <Route exact path = "/tytusx/20211SVAC/G01/reporte" component={Reporte}/>
            <Route exact path = "/tytusx/20211SVAC/G01/reporteTabla" component={TablaSimbolos}/>
            <Route exact path = "/tytusx/20211SVAC/G01/reporteErrores" component={TablaErrores}/>
            <Route exact path = "/tytusx/20211SVAC/G01/reporteGramatical" component={Gramatical}/>
            {/* <Route exact path = "/mywebsite" component={Navigation}/>
            <Route exact path = "/mywebsite/reporte" component={Reporte}/>
            <Route exact path = "/mywebsite/reporteTabla" component={TablaSimbolos}/>
            <Route exact path = "/mywebsite/reporteErrores" component={TablaErrores}/> */}
        </Switch>
    );
}


export default Routes;
