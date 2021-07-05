import './InConsole.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import  Graph  from 'react-graph-vis'
import React, { Component } from 'react';


class InConsole extends React.Component{

    constructor(props){
        super(props);
        this.datos = {nodes:[],edges:[]} 
        this.datos = this.props.location.datosCST;
        this.datosXML = this.props.location.datosCSTXML;
        this.datosAST = this.props.location.datosAST
        this.graphviz = ""
        this.graphvizCST=this.props.location.graphviz;
        this.datosXQuery = this.props.location.datosCSTXQuery; 
        console.log(this.props.location);
    }

    options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: '#000000'
        },
        interaction: { hover: true }
    };
     
    events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    render(){
        return(
            <header className="App-header">
                    TytusX - Fase 2
                <p></p>

                <div className="col-2 block">
                    <div className ="row">
                        <Link to= {{ pathname: "/tytusx/20211SVAC/G01", datos:this.datos }}>
                            <button type="button" className="btn btn-outline-dark">Regresar</button>
                        </Link>
                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>
                <p></p>

                <label>Árbol CST del Xquery</label>
                <div className = "container-fluid">
                    <Graph
                        graph={this.datosXQuery}
                        options={this.options}
                        events={this.events}
                        //style={style}
                        getNetwork={this.getNetwork}
                        getEdges={this.getEdges}
                        getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                </div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                
                <label>Árbol CST del XPath</label>
                <div className = "container-fluid">
                    <Graph
                        graph={this.datos}
                        options={this.options}
                        events={this.events}
                        getNetwork={this.getNetwork}
                        getEdges={this.getEdges}
                        getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                </div>

                <p></p>
                <p></p>
                <p></p>
                <p></p>

                <label>Árbol CST del XML</label>
                <div className = "container-fluid">
                    <Graph
                        graph={this.datosXML}
                        options={this.options}
                        events={this.events}
                        getNetwork={this.getNetwork}
                        getEdges={this.getEdges}
                        getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                </div>

                <p></p>
                <p></p>
                <p></p>
                <p></p>

                <label>Árbol AST del XPath</label>
                <div className = "container-fluid">
                    <Graph
                        graph={this.datosAST}
                        options={this.options}
                        events={this.events}
                        getNetwork={this.getNetwork}
                        getEdges={this.getEdges}
                        getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                </div>

                <p></p>
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

export default InConsole;