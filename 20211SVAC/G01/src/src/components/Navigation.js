import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React from 'react';
import {  parse as parseXPath } from '../code/analizadorXPath/Xpath'
import { parse as parseXQuery } from '../code/analizadorXQuery/ascendente';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { CD3 } from '../code/codigo3D/cd3';
import { XPATHC3D } from '../code/codigo3D/xpathC3D';
import { Entorno } from '../code/analizadorXQuery/Tabla/TablaSimbolos';
import { Error } from '../code/analizadorXQuery/Tabla/Error';
const { ErroresGlobal, LimpiarErrores } = require('../code/analizadorXPath/AST/Global')

require('../../node_modules/codemirror/mode/xquery/xquery')
require('../../node_modules/codemirror/mode/xml/xml')
require('../../node_modules/codemirror/mode/javascript/javascript')
require('../../node_modules/codemirror/mode/clike/clike')

const XPathDesc = require('../code/analizadorXPath/XPathDesc')
const grammar = require('../code/analizadorXML/grammar')
const grammarDesc = require('../code/analizadorXMLDesc/grammarDesc')


class Navigation extends React.Component{

    contadorTemporal = null;
    contadorEtiqueta = null;
    heap = null;
    stack = null;
    codigoXml = null;
    codigoXpath = null;
    codigoXquery = null;
    codigoC3D = null;

    constructor(props){
        super(props);

        this.state = {
            fileDownloadUrl:"",
            OutputTextarea: "",
            XMLTextarea: "",
            InputTextarea: "",
            TraductorTextArea: "", 
            resultadoConsulta: [], 
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
            datosCSTXQuery: {
                nodes: [
                    { id: 1, label: 'Node 1X' },
                    { id: 2, label: 'Node 2X' },
                    { id: 3, label: 'Node 3X' },
                    { id: 4, label: 'Node 4X' },
                    { id: 5, label: 'Node 5X' }
                ],
                edges: [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    { from: 2, to: 4 },
                    { from: 2, to: 5 }
                ]
            },
            graphvizCST:"",
            Mistakes: [],
            MistakesXPath: [],
            TablaGramatical: [],
            TablaGramticalXPath: [], 
            ErroresXQuery: []
        }
        this.fileInput = React.createRef();
        this.fileInput2 = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    setText(){  
        console.log("setText Button clicked");
        let text = this.state.InputTextarea;
        if(text=="") return
        var funcion = parseXPath(text); 
        if(funcion.errores.length > 0)
        {
            alert("Se encontraron errores en la consulta!")
            console.log(funcion.errores)
        }
        console.log(funcion)
        var respuesta=funcion.Ejecutar(this.state.XML);   
        var c3dXpath = this.getXpathC3D(respuesta);
    
        this.setState({OutputTextarea: respuesta});  
    
        var AST = funcion.Graficar();
        this.setState({AST:AST})
        funcion.InvertirNodes()
        var datos = {nodes:funcion.Nodos,edges:funcion.Edges}   
        this.setState({datosCST:datos}) 
        this.setState({MistakesXPath: funcion.errores})
        this.setState({TablaGramticalXPath: funcion.tablaGramatica});
    }

 

    xmlDesc(){
        var x = this.state.XMLTextarea;
        var resultado = grammarDesc.parse(x);
        if(resultado.errores.length>0)
        {
            alert("Se encontraron errores en el XML!")
            console.log(resultado.errores);
            return 
        }
        console.log(resultado)
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
        this.setState({Mistakes: resultado.errores})
        this.setState({TablaGramatical: resultado.tabla.reverse()})
    }
 
    actualizar(){ 
        
        var x = this.state.XMLTextarea;
        var resultado = grammar.parse(x)
        if(resultado.errores.length>0)
        {
            
            console.log(`Se encontraron errores en el XML!`)
            return
        }
        resultado.datos = this.getC3D(resultado.datos); 
        this.setState({XML:resultado.datos}) 
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
        this.setState({Mistakes: resultado.errores})   
        this.setState({TablaGramatical: resultado.tabla})
    }

    getC3D(xml){
        var traducir = new CD3(); 
        var codigo = traducir.getTraduccion(xml); 
        
        this.codigoXml = codigo.traduccion;
        this.codigoC3D = this.getEncabezado() + this.codigoXml;

        
        this.setState({TraductorTextArea: this.codigoC3D})

        this.contadorTemporal = traducir.getTemporal();
        console.log(this.contadorTemporal, `<--------Temporales XML`);

        this.heap = traducir.getHeap();
        console.log(this.heap.hp, `<--------Heap XML`);

        this.stack = traducir.getStack();
        console.log(this.stack.lista.length, `<--------Stack XML`);

        return codigo.objeto
    }

    getEncabezado(){
        let traduccion = `/* --- --- --- PRIMERA LINEA --- --- --- */\n#include <stdio.h> \n#include <math.h>\n`
        traduccion += ` double heap[31110999];\n double stack[31110999];\n double P;\n double H; \n double t0`   
        for (let index = 1; index < this.contadorTemporal; index++) {
            traduccion += `, t${index}`
        }

        traduccion += `; \n\n`

        return traduccion; 
    }

    getXpathC3D(xpath){
        var traducirX = new XPATHC3D();
        var respuesta = traducirX.getXpath(xpath, this.contadorTemporal, this.heap, this.stack);

        this.contadorTemporal = traducirX.getTemporal();
        this.heap = traducirX.getHeap();
        this.stack = traducirX.getStack();
        this.codigoXpath = respuesta;
        this.codigoC3D = this.getEncabezado() + this.codigoXpath + this.codigoXml;

        this.setState({TraductorTextArea: this.codigoC3D})

        return respuesta
    }

    handleOnChange = e => {
        this.setState({
            InputTextarea: e.getValue()
        })
    } 

    handleXML = e => {
        this.setState({
            XMLTextarea: e.getValue()
        })
    }

    descargar()
    {
        if (this.state.XMLTextarea=="") return
        const blob = new Blob([this.state.XMLTextarea])
        const fileDownloadUrl = URL.createObjectURL(blob)
        this.setState({fileDownloadUrl:fileDownloadUrl},
            ()=>{
                this.dofileDownload.click();
                URL.revokeObjectURL(fileDownloadUrl);
                this.setState({fileDownloadUrl: ""})
            }
        )
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
        var resultado = grammar.parse(content)
        console.log(resultado)
        if(resultado.errores.length>0)
        {
            
            console.log(`Se encontraron errores en el XML!`)
        }
        resultado.datos = this.getC3D(resultado.datos);
        this.setState({XML:resultado.datos}) 
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
        this.setState({Mistakes: resultado.errores})
        this.setState({TablaGramatical: resultado.tabla});
    } 

    fileReader2;

    handleSubmitPath = (event) => {
        this.fileReader2 = new FileReader();
        this.fileReader2.onloadend =  this.handleFileReaderPath;
        this.fileReader2.readAsText(event.target.files[0]);
    }

    handleFileReaderPath = (e) => {
        const content = this.fileReader2.result;
        console.log(content);
        this.setState({InputTextarea: content});
    } 

    handleFocus = (e) =>{
        if(e.getValue()=="") return
        var resultado = grammar.parse(e.getValue())        
        console.log(resultado)
        if(resultado.errores.length>0)
        {
            alert("Errores en el analisis del XML")
        }
        resultado.datos = this.getC3D(resultado.datos);
        this.setState({XML:resultado.datos})
        this.setState({datosCSTXML:{nodes:resultado.nodes,edges:resultado.edges}})
        this.setState({Mistakes: resultado.errores})
        this.setState({TablaGramatical: resultado.tabla});
    }

    ejecutarXQuery(){
        this.setState({ErroresXQuery: []})
        this.setState({OutputTextarea: ''})
        var texto = this.state.InputTextarea;         
        if(texto == "") return  
        var resultado = parseXQuery(texto); console.log(resultado); 
        this.setState({ErroresXQuery: resultado.errores})
        if(resultado.errores.length > 0){
            alert('Se encontraron errores en XQuery!')
            return
        }
        
        let consola = ""
        let retorno 
        let entornoGlobal = new Entorno(null, 'global')
        this.setState({datosCSTXQuery:{nodes:resultado.grafoNodes,edges:resultado.grafoEdges}})
        
        if(resultado.instrucciones instanceof Array){
            for(let instruccion of resultado.instrucciones){
                retorno =  instruccion.getValor(entornoGlobal, this.state.XML)
                if(retorno instanceof Error){
                    this.setState({ErroresXQuery: resultado.errores.concat(ErroresGlobal)})
                    this.limpiarErrores()
                    return
                }else{
                    consola += retorno
                    consola += '\n'
                }
            }
        }else{
            retorno =  resultado.instrucciones.getValor(entornoGlobal, this.state.XML)            
        }
        console.log('Errores Globales',ErroresGlobal )
        this.setState({ErroresXQuery: resultado.errores.concat(ErroresGlobal)})
        this.limpiarErrores()
        this.setState({OutputTextarea: consola}); 
    }

    limpiarErrores(){
        for(let i = 0; i < ErroresGlobal.length; i++){
            ErroresGlobal.pop(); 
        }
    }


    render(){
        return(
            <header className="App-header">
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" style={ { textDecoration: 'none' } } to= {{ pathname: "/tytusx/20211SVAC/G01/reporte", datosCST:this.state.datosCST, datosCSTXML:this.state.datosCSTXML, datosAST:this.state.AST ,graphviz:this.state.graphvizCST, datosCSTXQuery: this.state.datosCSTXQuery }}>
                            | Gráficas |
                        </Link>                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={ { textDecoration: 'none' } } to= {{ pathname: "/tytusx/20211SVAC/G01/reporteTabla", XML:this.state.XML }}>
                            | Tabla Simbolos |
                        </Link>                         
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={ { textDecoration: 'none' } } to= {{ pathname: "/tytusx/20211SVAC/G01/reporteGramatical", TablaGramatical:this.state.TablaGramatical, TablaGramticalXPath: this.state.TablaGramticalXPath }}>
                            | Reportes Gramaticales |
                        </Link>                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={ { textDecoration: 'none' } } to= {{ pathname: "/tytusx/20211SVAC/G01/reporteErrores", Mistakes:this.state.Mistakes, MistakesXPath:this.state.MistakesXPath, ErroresXQuery: this.state.ErroresXQuery }}>
                            | Listado de Errores |  
                        </Link>                        
                    </li>
                </ul>
            </nav>

            
                TytusX - Fase 2
            <p></p>
            

            
            <div className="container">
                <div className="row">
                    <p></p>
                    <p></p>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 block">
                        
                        <div className="row container">
                            <label className="labelClass">Ingresar XML </label>
                            {/* <textarea className="Text" placeholder="Bienvenido" defaultValue={this.state.XMLTextarea} onChange={this.handleXML} onBlur={this.handleFocus} /> */}
                            <CodeMirror
                             className="codeMirror"
                             value={this.state.XMLTextarea}
                             options={{
                                mode: 'xml',
                                theme: 'dracula',
                                lineNumbers: true,
                                styleActiveLine: true,
                                columnNumbers:true,
                                inputStyle:'textarea'
                              }}
                             onBlur={this.handleFocus}
                             onChange={this.handleXML}
                             placeholder="Bienvenido"
                             />
                        </div>
                        <div className="row">
                        <p></p>
                            <div className="col-12 block">
                                <button type="button" className="btn btn-outline-dark" onClick={ () => this.actualizar() }> Ejecutar XML </button> 
                            </div>
                        </div>
                    </div>
                    <div className="col-6 block">
                        <div className="row container">
                            <label className="labelClass"> Ingresar Consulta </label> 
                            <CodeMirror
                             className="codeMirror"
                             value = {this.state.InputTextarea}
                             options={{
                                mode: 'xquery',
                                theme: 'dracula',
                                lineNumbers: true,
                                styleActiveLine: true,
                                lineWrapping: true,
                                columnNumbers:true,
                                foldGutter: true,
                                gutter: true,
                              }}
                             onChange={this.handleOnChange}
                             placeholder="Bienvenido"
                             />
                        </div>
                        <div className="row">
                            <p></p>
                            <div className="col-6 block"> 
                                <button type="submit" className="btn btn-outline-dark" onClick={ () => this.setText() }>Análisis XPath </button>
                            </div>                            
                            <div className="col-6 block">
                                <button type="submit" className="btn btn-outline-dark" onClick={ () => this.ejecutarXQuery() }> Análisis XQuery </button>
                            </div>
                        </div>

                    </div>                    
                </div>
            </div>
            <div className="container">
            <div className="row">
                        <div className="row container">
                            <label className="labelClass"> Traducción a C3D </label> 
                            <CodeMirror
                             className="codeMirror"
                             value = {this.state.TraductorTextArea}
                             options={{
                                mode: 'clike',
                                theme: 'dracula',
                                lineNumbers: true,
                                styleActiveLine: true,
                                lineWrapping: true,
                                columnNumbers:true,
                                foldGutter: true,
                                gutter: true,
                              }}
                             //onChange={}
                             placeholder="Bienvenido"
                             />
                        </div>
                    </div>    
            </div>
            <div className="container">
                <div className="row">
                    <label className="labelClass"> Salida </label>
                    <div className="text-center">
                        <CodeMirror
                             className="codeMirror"
                             value={this.state.OutputTextarea}
                             options={{
                                mode: 'xml',
                                theme: 'dracula',
                                lineNumbers: true,
                                styleActiveLine: true,
                                lineWrapping: true,
                                columnNumbers:true,
                                foldGutter: true,
                                gutter: true,
                                readOnly:true,
                              }}
                             placeholder="Bienvenido"
                             />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <label className="labelClass"> Optimización del Código </label>
                    <div className="text-center">
                        <CodeMirror
                             className="codeMirror"
                             value={this.state.OutputTextarea}
                             options={{
                                mode: 'xml',
                                theme: 'dracula',
                                lineNumbers: true,
                                styleActiveLine: true,
                                lineWrapping: true,
                                columnNumbers:true,
                                foldGutter: true,
                                gutter: true,
                                readOnly:true,
                              }}
                             placeholder="Bienvenido"
                             />
                    </div>
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>

            <div className="container"></div>

            <footer className="bg-dark text-center text-lg-start">
            <div className="text-center p-3 text-light ">
                <font size="4">
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



export default Navigation;