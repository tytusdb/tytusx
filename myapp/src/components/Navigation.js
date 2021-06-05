import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React from 'react';
import { toPlainObject } from 'lodash';


class Navigation extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            OutputTextarea: "",
            XMLTextarea: "",
            InputTextarea: ""
        }
        
        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    

    datos = {
        nodes: [
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' }
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
        ]
    }

    XML = {
        tipo : '',
        texto : '',
        atributos : [],
        hijos : []
    }

    setText(){
        console.log("setText Button clicked");
        let text = this.state.InputTextarea;
        alert(text);
        var parser = require('../code/analizadorXPath/Xpath');
        var funcion = parser.parse(text);
        var respuesta=funcion.Ejecutar(this.XML);
        this.setState({OutputTextarea: respuesta});         
    }

    
    actualizar(){
        var x = document.getElementById('XMLTextarea').value;
        var analizadorXML = require('../code/analizadorXML/analizadorXML');
        var resultado = analizadorXML.Ejecutar(x);
        this.XML = resultado
    }

    refresh(){
        document.getElementById('XMLTextarea').addEventListener('focus', () => this.actualizar(), false);
    }

    handleOnChange = e => {
        this.setState({
            InputTextarea: e.target.value
        })
    } 

    handleXML = e => {
        this.setState({
            XMLTextarea: e.target.value
        })
    }

    fileReader;

    handleSubmit = (event) => {

        this.fileReader = new FileReader();
        this.fileReader.onloadend =  this.handleFileReader;
        this.fileReader.readAsText(event.target.files[0]);
    }

    handleFileReader = (e) => {
        const content = this.fileReader.result;
        console.log(content);
        this.setState({XMLTextarea: content});

        var analizadorXML = require('../code/analizadorXML/analizadorXML')
        var resultado = analizadorXML.Ejecutar(content)
        this.XML = resultado

    } 

    handleFocus = (e) =>{
        var analizadorXML = require('../code/analizadorXML/analizadorXML')
        var resultado = analizadorXML.Ejecutar(e.target.value)
        this.XML = resultado
    }


    render(){
        return(
            //tag principal
            <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
                Organización de Lenguajes y Compiladores 2
            <p></p>
            

            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="custom-file">
                            <input className="custom-file-input" type="file" ref={this.fileInput} onChange={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <p></p>
                    <p></p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => this.setText() }>Compilar</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.actualizar}>Actualizar</button>
                    </div>
                    <div className="col">
                        <Link to= {{ pathname: "/mywebsite/reporte", datos:this.datos }}>
                            <button type="button" className="btn btn-primary btn-lg">Reportes</button>
                        </Link>
                        
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 block">
                        <label className="labelClass">Xml Input</label>
                        <textarea className="Text" placeholder="Bienvenido" defaultValue={this.state.XMLTextarea} onChange={this.handleXML} onBlur={this.handleFocus} />
                    </div>
                    <div className="col-6 block">
                        <label className="labelClass">Xpath Input</label>
                        <textarea className="Text" placeholder="Bienvenido" /*form*/ onChange={this.handleOnChange}></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <label className="labelClass">Output</label>
                    <div className="text-center">
                        <textarea className="Text" placeholder="Bienvenido" defaultValue={this.state.OutputTextarea} />
                    </div>
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



export default Navigation;