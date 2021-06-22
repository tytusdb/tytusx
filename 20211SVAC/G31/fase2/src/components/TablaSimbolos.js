import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import TablaSimbolo from './TablaSimbolo'


class TablaSimbolos extends React.Component{

    constructor(props){
        super(props);
        this.XML = this.props.location.XML;
        console.log(this.XML);

        this.table = [];
        this.readSimbols(this.XML);
        console.log(this.table);
    }

    readSimbols(ent){
        
        //Por si es el global
        var entActual = ent.tipo;
        if(entActual == "/"){
            entActual = "global";
        }

        //Etiquetas
        this.table.push({nombre: "NombreEtiqueta",
        tipo: "Cadena",
        valor: entActual,
        ambito: entActual,
        fila: ent.linea,
        columna: ent.columna
        });
        
        //Valor de las etiquetas
        if(ent.texto != ""){
            this.table.push({nombre: "ValorEtiqueta",
            tipo: "Cadena",
            valor: ent.texto,
            ambito: entActual,
            fila: ent.linea,
            columna: ent.columna
            });
        }
        
        //para cada atributo
        for (const atributo of ent.atributos) {

            this.table.push({
                nombre: atributo.nombre,
                tipo: "Atributo",
                valor: atributo.valor,
                ambito: entActual,
                fila: atributo.linea,
                columna: atributo.columna
            });   
        }

        //para cada hijo
        for (const hijo of ent.hijos) {

            this.table.push({
                nombre: hijo.tipo,
                tipo: "Etiqueta",
                valor: "Object",
                ambito: entActual,
                fila: hijo.linea,
                columna: hijo.columna
            });  
            
            this.readSimbols(hijo);
        }

    }


    render(){
        return(
            <header className="App-header">
    
                <img src={logo} className="App-logo" alt="logo" />
                    Organización de Lenguajes y Compiladores 2
                <p></p>

                <div className="col-2 block">
                    <div className ="row">
                        <Link to= {{ pathname: "/tytusx/20211SVAC/G17", XML:this.XML }}>
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
                
                <div className = "container">
                    <div className="row">
                    <TablaSimbolo data={this.table}/>
                    </div>
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

export default TablaSimbolos;