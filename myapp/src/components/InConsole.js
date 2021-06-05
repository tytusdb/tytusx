import './InConsole.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import  Graph  from 'vis-react-core'
import { Component } from 'react';


function InConsole(){

    const datos = this.props.datos;
    //const datos = document.querySelector(this.props.location.datos);

    var options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: '#000000'
        },
        interaction: { hoverEdges: true }
    };
     
    var events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    return(
        <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
                Organización de Lenguajes y Compiladores 2 
            <p></p>
            

            <div className="container">
                <Link to={"/mywebsite"}>
                    <button type="button" className="btn btn-primary btn-lg">Back</button>
                </Link>
            </div>

            <div className = "container-fluid">
                <Graph
                    graph={datos}
                    options={options}
                    events={events}
                    //style={style}
                    getNetwork={this.getNetwork}
                    getEdges={this.getEdges}
                    getNodes={this.getNodes}
                    vis={vis => (this.vis = vis)}
                />
            </div>
            

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

export default InConsole;