import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import SimboloXQ from './SimboloXQ'


class SimbolosXQ extends React.Component {

    constructor(props) {
        super(props);
        this.XML = this.props.location.XML;

        this.table = [];
        
        this.SimbolosXquery=this.GetTablaStorage();

        this.readSimbols(this.SimbolosXquery);
    }

    readSimbols(ent){
        this.table.push({
            nombre: "----",
            tipo: "----",
            fila: "---",
            columna: "----"
        });
        /*this.table.push({
            nombre: ent.identificador,
            tipo: ent.tipo,
            fila: ent.linea,
            columna: ent.columna
        });*/
    }

    GetTablaStorage(){
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    }

    render() {
        return (
            <header className="App-header">

                <p></p>
                <p></p>
                <h1>OLC2 - Proyecto 2</h1>

                <div className="col-2 block">
                    <div className="row">
                        <Link to={{ pathname: "/", XML: this.XML }}>
                            <button type="button" className="btn btn-primary btn-lg">Atrás</button>
                        </Link>
                    </div>
                </div>

                <p></p>
                <p></p>

                <div className="row">
                    <label> Tabla de Símbolos XQUERY </label>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">
                        <SimboloXQ data={this.table} />
                    </div>
                </div>

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

export default SimbolosXQ;