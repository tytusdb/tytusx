import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';


class TablaErrores extends React.Component{

    constructor(props){
        super(props);
        this.Mistakes = this.props.location.Mistakes;
        this.MistakesXPath = this.props.location.MistakesXPath;
        this.ErroresXQuery = this.props.location.ErroresXQuery; 
        console.log("Mostrando errores XML...");
        console.log(this.Mistakes);
        console.log("Mostrando errores XPath...");
        console.log(this.MistakesXPath);
    }

    

    render(){
        return(
            <header className="App-header">
    
                <img src={logo} className="App-logo" alt="logo" />
                    TytusX - Fase 2
                <p></p>

                <div className="col-2 block">
                    <div className ="row">
                        <Link to= {{ pathname: "/tytusx/20211SVAC/G01" }}>
                            <button type="button" className="btn btn-outline-dark">Regresar</button>
                        </Link>
                    </div>
                </div>
                
                <div className="row">
                    <label> Tabla de Errores XQuery </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Descripción</th> 
                        <th>Tipo</th>
                        <th>Fila</th>
                        <th>Columna</th>
                    </tr> 
                    </thead>
                    <tbody>
                    { 
                        this.ErroresXQuery.map(function(item){
                            return (
                            <tr>
                                <td>{item.Error}</td>
                                <td>{item.tipo}</td>
                                <td>{item.linea}</td>
                                <td>{item.columna}</td>
                            </tr>
                            )
                        }) 
                    }
                    </tbody> 
                </table>
    
                    </div>
                </div>

                <p></p>
                <p></p>

                <div className="row">
                    <label> Tabla de Errores XML </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Descripción</th> 
                        <th>Tipo</th>
                        <th>Fila</th>
                        <th>Columna</th>
                    </tr> 
                    </thead>
                    <tbody>
                    { 
                        this.Mistakes.map(function(item){
                            return (
                            <tr>
                                <td>{item.Error}</td>
                                <td>{item.tipo}</td>
                                <td>{item.Linea}</td>
                                <td>{item.columna}</td>
                            </tr>
                            )
                        }) 
                    }
                    </tbody> 
                </table>
    


                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="row">
                    <label> Tabla de Errores XPath </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Descripción</th> 
                        <th>Tipo</th>
                        <th>Fila</th>
                        <th>Columna</th>
                    </tr> 
                    </thead>
                    <tbody>
                    { 
                        this.MistakesXPath.map(function(item){
                            return (
                            <tr>
                                <td>{item.Error}</td>
                                <td>{item.tipo}</td>
                                <td>{item.Linea}</td>
                                <td>{item.columna}</td>
                            </tr>
                            )
                        }) 
                    }
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
                Grupo 1 <br/>
                Universidad de San Carlos de Guatemala <br/>
                Facultad de Ingeniería <br/>
                Escuela de Ciencias y Sistemas <br/>
                Organización de Lenguajes y Compiladores 2<br/>
                Junio de 2021<br/>                
                </p>
                </font>   
            </div>
            </footer>
            </header>
        );
    }
    
}

export default TablaErrores;