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
            InputTextarea: "",
            XML: {
                tipo : '',
                texto : '',
                atributos : [],
                hijos : []
            },
            datosCST: {
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
            },
            datosCSTXML: {
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
            },
            AST:{
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
            },
            graphvizCST:""
        }
        
        

        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    setText(){
        console.log("setText Button clicked");
        let text = this.state.InputTextarea;
        if(text=="") return
        var parser = require('../code/analizadorXPath/Xpath');
        var funcion = parser.parse(text);
        if(funcion.errores.length > 0)
        {
            alert("Se detectaron errores en la entrada :( Xpath")
            console.log(funcion.errores)
        }
        var respuesta=funcion.Ejecutar(this.state.XML);
        var AST = funcion.Graficar();
        this.setState({AST:AST})
        this.setState({OutputTextarea: respuesta});  
        var datos = {nodes:funcion.Nodos,edges:funcion.Edges}   
        this.setState({datosCST:datos}) 
        this.setState({graphvizCST:funcion.graphviz})
    }

    setTextDesc(){
        console.log("setTextDesc Button clicked");
        let text = this.state.InputTextarea;
        if(text=="") return
        var parser = require('../code/analizadorXPath/XpathDesc');
        var funcion = parser.parse(text);
        if(funcion.errores.length > 0)
        {
            alert("Se detectaron errores en la entrada :( Xpath")
            console.log(funcion.errores)
        }
        var respuesta=funcion.Ejecutar(this.state.XML);
        var AST = funcion.Graficar();
        this.setState({AST:AST})
        this.setState({OutputTextarea: respuesta});  
        var datos = {nodes:funcion.Nodos,edges:funcion.Edges}   
        this.setState({datosCST:datos}) 
        this.setState({graphvizCST:funcion.graphviz})
    }

    xmlDesc(){
        var x = this.state.XMLTextarea;
        var analizadorXMLDesc = require('../code/analizadorXMLDesc/analizadorXMLDesc');
        var resultado = analizadorXMLDesc.Ejecutar(x);
        if(resultado.errores.length>0)
        {
            alert("Errores en el analisis del XML")
        }
        console.log(resultado)
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
    }

    
    actualizar(){
        var x = this.state.XMLTextarea;
        var analizadorXML = require('../code/analizadorXML/analizadorXML');
        var resultado = analizadorXML.Ejecutar(x);
        if(resultado.errores.length>0)
        {
            alert("Errores en el analisis del XML")
        }
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
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
        if(content=="") return
        var analizadorXML = require('../code/analizadorXML/analizadorXML')
        var resultado = analizadorXML.Ejecutar(content)
        if(resultado.errores.length>0)
        {
            alert("Errores en el analisis del XML")
        }
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
    } 

    handleFocus = (e) =>{
        if(e.target.value=="") return
        var analizadorXML = require('../code/analizadorXML/analizadorXML')
        var resultado = analizadorXML.Ejecutar(e.target.value)        
        console.log(resultado)
        if(resultado.errores.length>0)
        {
            alert("Errores en el analisis del XML")
        }
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
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
                        <button type="button" className="btn btn-primary btn-lg" onClick={ () => this.xmlDesc() }>XML Desc</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={ () => this.setText() }>Compilar ASC</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={ () => this.setTextDesc() }>Compilar DESC</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary btn-lg" onClick={ () => this.actualizar() }>Actualizar</button>
                    </div>
                    <div className="col">
                        <Link to= {{ pathname: "/mywebsite/reporte", datosCST:this.state.datosCST, datosCSTXML:this.state.datosCSTXML, datosAST:this.state.AST ,graphviz:this.state.graphvizCST }}>
                            <button type="button" className="btn btn-primary btn-lg">Reportes</button>
                        </Link>                        
                    </div>
                    <div className="col">
                        <Link to= {{ pathname: "/mywebsite/reporteTabla", XML:this.state.XML }}>
                            <button type="button" className="btn btn-primary btn-lg">Tabla Simbolos</button>
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