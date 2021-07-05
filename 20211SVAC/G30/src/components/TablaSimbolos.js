import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import TablaSimbolo from './TablaSimbolo'


class TablaSimbolos extends React.Component {

    constructor(props) {
        super(props);
        this.XML = this.props.location.XML;

        this.table = [];
        this.readSimbols(this.XML);
    }

    readSimbols(ent) {

        //Por si es el global
        var entActual = ent.tipo;
        if (entActual == "/") {
            entActual = "global";
        }

        //Etiquetas
        /*this.table.push({
            nombre: "NombreEtiqueta",
            tipo: "Cadena",
            valor: entActual,
            ambito: entActual,
            fila: ent.linea,
            columna: ent.columna,
            stackPosition: 0
        });*/

        //Valor de las etiquetas
        if (ent.texto != "") {
            this.table.push({
                nombre: "ValorEtiqueta",
                tipo: "Cadena",
                valor: ent.texto,
                ambito: entActual,
                fila: ent.linea,
                columna: ent.columna,
                stackPosition: ent.posicionStack
            });
            /*this.table.push({
                nombre: ent.tipo,
                tipo: "Object",
                valor: ent.texto,
                ambito: entActual,
                fila: ent.linea,
                columna: ent.columna,
                stackPosition: 0
            });*/
        }

        //para cada atributo
        for (const atributo of ent.atributos) {

            this.table.push({
                nombre: atributo.nombre,
                tipo: "Atributo",
                valor: atributo.valor,
                ambito: entActual,
                fila: atributo.linea,
                columna: atributo.columna,
                stackPosition: atributo.posicionStack
            });
        }

        //para cada hijo
        for (const hijo of ent.hijos) {

            this.table.push({
                nombre: hijo.tipo,
                tipo: "Etiqueta",
                valor: "Object",
                // tipo: "Object",
                // valor: ent.texto,
                ambito: entActual,
                fila: hijo.linea,
                columna: hijo.columna,
                stackPosition: hijo.posicionStack
            });

            this.readSimbols(hijo);
        }

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
                    <label> Tabla de Símbolos </label>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">
                        <TablaSimbolo data={this.table} />
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

export default TablaSimbolos;