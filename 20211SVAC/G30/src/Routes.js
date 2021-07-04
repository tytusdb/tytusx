import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Reporte from './components/InConsole'
import TablaSimbolos from './components/TablaSimbolos'
import TablaErrores from './components/TablaErrores'
import Gramatical  from './components/Gramatical'

const Routes = () => {
    useEffect(()=>{
        document.title="OLC2 - G30"
    })
    return (
        <Switch>
            <Route exact path = "/tytusx/20211SVAC/G17" component={Navigation}/>
            <Route exact path = "/" component={Navigation}/>
            <Route exact path = "/tytusx/20211SVAC/G30" component={Navigation}/>
            <Route exact path = "/tytusx/G30" component={Navigation}/>
            <Route exact path = "/tytusx/G30/reporte" component={Reporte}/>
            <Route exact path = "/tytusx/G30/reporteTabla" component={TablaSimbolos}/>
            <Route exact path = "/tytusx/G30/reporteErrores" component={TablaErrores}/>
            <Route exact path = "/tytusx/G30/reporteGramatical" component={Gramatical}/>
        </Switch>
    );
}


export default Routes;
