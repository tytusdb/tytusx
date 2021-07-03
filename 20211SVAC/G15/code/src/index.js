import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Interfaz from './componentes/Interfaz';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';



ReactDOM.render(
  <Router>
  <div>
    <Switch>

        {/* Páginas */}
        <Router basename="/tytusx/20211SVAC/G15">
        <Route exact path='/' component={Interfaz} />
        </Router>
      </Switch>
  </div>
</Router>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
