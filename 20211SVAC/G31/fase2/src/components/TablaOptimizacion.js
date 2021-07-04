import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React from 'react';


class TablaOptimizacion extends React.Component{

    constructor(props){
        super(props);
        /*this.Mistakes = this.props.location.Mistakes;
        this.MistakesXPath = this.props.location.MistakesXPath;
        this.ErroresXQuery = this.props.location.ErroresXQuery; 
        console.log("Aqui estan los errores XML");
        console.log(this.Mistakes);
        console.log("Aqui estan los errores XPath");
        console.log(this.MistakesXPath);*/
        this.TablaOptimizacion = this.props.location.TablaOptimizacion;
        console.log(this.TablaOptimizacion);
    }

    

    render(){
        return(
            <header className="App-header">
    
                <img src={logo} className="App-logo" alt="logo" />
                    Organización de Lenguajes y Compiladores 2
                <p></p>

                <div className="col-2 block">
                    <div className ="row">
                        <Link to= {{ pathname: "/tytusx/20211SVAC/G31" }}>
                            <button type="button" className="btn btn-primary btn-lg">Atrás</button>
                        </Link>
                    </div>
                </div>
                
                <div className="row">
                    <label> Reporte Optimizacion </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Regla</th> 
                        <th>Descripcion</th>
                        <th>Fila</th>
                        <th>Columna</th>
                    </tr> 
                    </thead>

                    <tbody>
                        { this.TablaOptimizacion.map(function (item) {
                            return (
                                <tr>
                                    <td>{item.regla}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.linea}</td>
                                    <td>{item.columna}</td>
                                </tr>
                            )
                            
                        })  }
                    </tbody>
                    
                </table>

                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>

            <footer className="bg-dark text-center text-lg-start">
            <div className="text-center p-3 text-light ">
                <font size="3">
                <p>
                Grupo 31 <br/>
                Jacqueline Méndez - Stefany Coromac <br/>
                Organización de Lenguajes y Compiladores 2<br/>
                Escuela de Vacaciones Junio 2021<br/>                
                </p>
                </font>   
            </div>
            </footer>
            </header>
        );
    }
    
}

export default TablaOptimizacion;