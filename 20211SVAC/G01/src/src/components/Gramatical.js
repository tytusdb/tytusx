import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';


class Gramatical extends React.Component{

    constructor(props){
        super(props);
        this.TablaGramatical = this.props.location.TablaGramatical;
        this.TablaGramticalXPath = this.props.location.TablaGramticalXPath;
        console.log("Contenido del análisis gramatical");
        console.log(this.TablaGramatical);
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

                <p></p>
                <p></p>

                <div className="row">
                    <label> Reporte Gramatical XML </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Producción</th> 
                        <th>Acción</th>                        
                    </tr> 
                    </thead>
                    <tbody>
                    { 
                        this.TablaGramatical.map(function(item){
                            return (
                            <tr>
                                <td>{item.padre + " -> " + item.hijos}</td>
                                <td>{item.produccion}</td>
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
                    <label> Reporte Gramatical XPath </label>
                </div>
                

                <p></p>
                <p></p>
                <p></p>
                
                <div className = "container">
                    <div className="row">

                    <table className="table table-dark"> 
                    <thead> 
                    <tr> 
                        <th>Producción</th> 
                        <th>Acción</th>
                    </tr> 
                    </thead>
                    <tbody>
                    { 
                        this.TablaGramticalXPath.map(function(item){
                            return (
                            <tr>
                                <td>{item.padre + " -> " + item.hijos}</td>
                                <td>{item.produccion}</td>
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

export default Gramatical;