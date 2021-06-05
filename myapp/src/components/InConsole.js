import './InConsole.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import  Graph  from 'vis-react'
import React, { Component } from 'react';


class InConsole extends React.Component{

    constructor(props){
        super(props);
        this.datos = this.props.location.datos;
        console.log(this.datos);
    }

    

    options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: '#000000'
        },
        interaction: { hoverEdges: true }
    };
     
    events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    render(){
        return(
            <header className="App-header">
    
                <img src={logo} className="App-logo" alt="logo" />
                    Organización de Lenguajes y Compiladores 2
                <p></p>

                <div className="col-2 block">
                    <div className ="row">
                        <Link to= {{ pathname: "/mywebsite", datos:this.datos }}>
                            <button type="button" className="btn btn-primary btn-lg">Atrás</button>
                        </Link>
                    </div>
                </div>
                
                <div className = "container-fluid">
                    <Graph
                        graph={this.datos}
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

            <footer className="bg-dark text-center text-lg-start">
            <div className="text-center p-3 text-light ">
                <font size="3">
                <p>
                Grupo 17 <br/>
                Jorge Ambrocio - Marcelo Marroquín - Viany Juárez<br/>
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

export default InConsole;