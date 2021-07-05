import './InConsole.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import Graph from 'react-graph-vis'
import React, { Component } from 'react';


class InConsole extends React.Component {

    constructor(props) {
        super(props);
        this.datos = { nodes: [], edges: [] }
        this.datos = this.props.location.datosCST;
        this.datosXML = this.props.location.datosCSTXML;
        this.datosAST = this.props.location.datosAST
        this.graphviz = ""
        this.graphvizCST = this.props.location.graphviz;
        console.log(this.props.location);
    }

    options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: '#ffffff'
        },
        interaction: { hover: true },
        width: '100%'
    };

    events = {
        select: function (event) {
            var { nodes, edges } = event;
        }
    };

    render() {
        return (
            <header className="App-header">

                <p></p>
                <p></p>
                <h1>OLC2 - Proyecto 2</h1>

                <div className="col-2 block">
                    <div className="row">
                        <Link to={{ pathname: "/", datos: this.datos }}>
                            <button type="button" className="btn btn-primary btn-lg">Atrás</button>
                        </Link>
                    </div>
                </div>

                <label>Árbol XPath CST</label>
                <div className="container-fluid">
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
                <p></p>

                <label>Árbol XML CST</label>
                <div className="container-fluid">
                    <Graph
                        graph={this.datosXML}
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

                <label>Árbol XPath AST</label>
                <div className="container-fluid">
                    <Graph
                        graph={this.datosAST}
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

                <footer className="bg-dark text-center text-lg-start">
                    <div className="text-center p-3 text-light ">
                        <font size="3">
                            <p>
                                Grupo 30 <br />
                            </p>
                        </font>
                    </div>
                </footer>
            </header>
        );
    }

}

export default InConsole;