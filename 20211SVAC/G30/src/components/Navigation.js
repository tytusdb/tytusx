import { Link } from 'react-router-dom'
import React from 'react';
import { parse as parseXPath } from '../code/analizadorXPath/Xpath'
//import { parse as XQuery } from '../code/analizadorXQuery/XQuery';
//import { parse } from '../code/analizadorXQuery/gram_xquery';
import { parse as grammar } from '../code/analizadorXML/grammar';
// import { gram_xquery  } from '../code/analizadorXQuery/gram_xquery';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { GeneradorC3D } from "../code/analizadorXML/generadorC3D";

import { Instruccion } from '../code/optimizador/codigo/instruccion'
import { tipoInstruccion } from '../code/optimizador/codigo/instruccion'
import { Optimizador } from '../code/optimizador/codigo/optimizador'
//import { parse as parseOptimizador } from '../code/optimizador/test'

require('../../node_modules/codemirror/mode/xquery/xquery')
require('../../node_modules/codemirror/mode/xml/xml')
require('../../node_modules/codemirror/mode/javascript/javascript')
require('../../node_modules/codemirror/mode/clike/clike')

//const XPath = require('../code/analizadorXPath/Xpath')
//const grammar = require('../code/analizadorXML/grammar')

const {XQuery} = require('../code/analizadorXQuery/XQuery')

//const GeneradorC3D = require('../code/analizadorXML/generadorC3D')


class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileDownloadUrl: "",
            OutputTextarea: "",
            XMLTextarea: "",
            InputTextarea: "",
            Codigo3D: "",
            traduccionXML: "",
            XML: {
                tipo: '',
                texto: '',
                atributos: [],
                hijos: []
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
            AST: {
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
            graphvizCST: "",
            Mistakes: [],
            MistakesXPath: [],
            TablaGramatical: [],
            TablaGramticalXPath: []
        }
        this.fileInput = React.createRef();
        this.fileInput2 = React.createRef();
        this.handleSubmitXML = this.handleSubmitXML.bind(this);

    }
    //funcion donde se interpreta la entrada
    setText() {
        //console.log("setText Button clicked");
        //se guarda la entrada en una variable
        let text = this.state.InputTextarea;
        if (text == "") return



        //se analiza
        /*var funcion = parseXPath(text);
        4de64456b6f152945370948616460c5f31a0c9b9
        //manejo de errores
        if (funcion.errores.length > 0) {
            alert("Se detectaron errores en la entrada :( Xpath")
            console.log(funcion.errores)
        }
        //se interpreta
        var respuesta = funcion.Ejecutar(this.state.XML);
        //salida
        console.log(respuesta); 
        this.setState({ OutputTextarea: respuesta });*/
        //arbol
        /*var AST = funcion.Graficar();
        this.setState({ AST: AST })
        funcion.InvertirNodes()
        //se guardan datos de graphviz
        var datos = { nodes: funcion.Nodos, edges: funcion.Edges }
        this.setState({ datosCST: datos }) 
        this.setState({ MistakesXPath: funcion.errores })
        this.setState({ TablaGramticalXPath: funcion.tablaGramatica });
        */
        var query = XQuery.parse(text)
        console.log(query)
        //LLAMANDO AL ANALIZADOR DE XQUERY
        try {

            console.log("QUERY\n" + query)
            console.log("QUERY\n" + query.toString())
            this.setState({ OutputTextarea: query.toString() });
        } catch (error) {
            this.setState({ OutputTextarea: 'No matches found..' });
        }

        var generadorC3D = new GeneradorC3D();
        let resultadoXML = this.state.XML
        this.setState({ Codigo3D: generadorC3D.getTraduccionCompleta(resultadoXML, query.toString()) })
        this.setState({ XML: resultadoXML })


    }
    //funcion donde se carga el XML
    actualizar() {
        var codigoXML = this.state.XMLTextarea;
        var resultado = grammar(codigoXML)
        //var resultado = grammar.parse(codigoXML);
        if (resultado.errores.length > 0) {
            alert("Errores en el analisis del XML");
        }
        //guardando el objeto XML en localstorage
        this.SetXMLStorage(resultado.datos)
        // var generadorC3D = new GeneradorC3D();
        // this.setState({ Codigo3D: generadorC3D.getTraduccionCompleta(resultado.datos)})
        this.setState({ XML: resultado.datos })
        this.setState({ datosCSTXML: { nodes: resultado.nodes, edges: resultado.edges } })
        this.setState({ Mistakes: resultado.errores })
        this.setState({ TablaGramatical: resultado.tabla })

        var generadorC3D = new GeneradorC3D();
        this.setState({ Codigo3D: generadorC3D.getTraduccionCompleta(this.state.XML, "este es el resultado de la consulta") })
    }


    SetXMLStorage(data) {
        localStorage.setItem('XML', JSON.stringify(data));
    }

    GetXMLStorage() {
        var data = localStorage.getItem('XML');
        return JSON.parse(data);
    }


    handleOnChangeXQueryCode = e => {
        this.setState({
            InputTextarea: e.getValue()
        })
    }
    handleOnChangeXmlCode = e => {
        this.setState({
            XMLTextarea: e.getValue()
        })
    }
    descargar() {
        if (this.state.XMLTextarea == "") return
        const blob = new Blob([this.state.XMLTextarea])
        const fileDownloadUrl = URL.createObjectURL(blob)
        this.setState({ fileDownloadUrl: fileDownloadUrl },
            () => {
                this.dofileDownload.click();
                URL.revokeObjectURL(fileDownloadUrl);
                this.setState({ fileDownloadUrl: "" })
            }
        )
    }

    fileReader;

    handleSubmitXML = (event) => {                              //SE EJECUTAN AL CARGAR EL XML
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleFileReader;
        this.fileReader.readAsText(event.target.files[0]);
    }
    handleFileReader = (e) => {
        const content = this.fileReader.result;
        this.setState({ XMLTextarea: content });
        if (content == "") return
        var resultado = grammar.parse(content)
        console.log(resultado)
        if (resultado.errores.length > 0) {
            alert("Errores en el analisis del XML")
        }

        this.SetXMLStorage(resultado.datos)
        var generadorC3D = new GeneradorC3D();
        this.setState({ Codigo3D: generadorC3D.getTraduccionCompleta(this.state.XML, "este es el resultado de la consulta") })
        /*var generadorC3D = new GeneradorC3D();
        this.setState({ Codigo3D: generadorC3D.getTraduccionCompleta(resultado.datos)})*/
        this.setState({ XML: resultado.datos })
        this.setState({ datosCSTXML: { nodes: resultado.nodes, edges: resultado.edges } })
        this.setState({ Mistakes: resultado.errores })
        this.setState({ TablaGramatical: resultado.tabla });
    }

    fileReader2;

    handleSubmitPath = (event) => {                             //SE EJECUTAN AL CARGAR EL XPATH/XQUERY
        this.fileReader2 = new FileReader();
        this.fileReader2.onloadend = this.handleFileReaderPath;
        this.fileReader2.readAsText(event.target.files[0]);
    }
    handleFileReaderPath = (e) => {
        const content = this.fileReader2.result;
        //console.log(content);
        this.setState({ InputTextarea: content });
    }

    handleFocus = (e) => {                                     //onBlur XmlInput
        if (e.getValue() == "") return
        //var resultado = grammar.parse(e.getValue())
        var resultado = grammar(e.getValue())
        //console.log(resultado)
        if (resultado.errores.length > 0) {
            alert("Errores en el analisis del XML")
        }
        this.SetXMLStorage(resultado.datos)
        this.setState({ XML: resultado.datos })
        this.setState({ datosCSTXML: { nodes: resultado.nodes, edges: resultado.edges } })
        this.setState({ Mistakes: resultado.errores })
        this.setState({ TablaGramatical: resultado.tabla });
    }

    //ESTA ES LA FUNCION QUE SE EJECUTA CUANDO SE ANALIZA
    botongeneral() {
        this.actualizar(); //XML
        this.setText(); //Xquery
    }

    // OPTIMIZADOR

    optimizar() {
        console.log('optimizador');
        //console.log('->', this.state.Codigo3D);
        let optimizador = new Optimizador();

        let nuevo = optimizador.optimizar(this.state.Codigo3D);
        this.setState({ Codigo3D: nuevo });
    }

    handleOpti = (event) => {

        this.setState({
            Codigo3D: event.getValue()
        })

        //console.log('nuevo valor! -> ', this.state.Codigo3D);

    }


    render() {
        return (
            //tag principal
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#" id="principalTitle">TYTUSX</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" style={{ textDecoration: 'none' }} to={{ pathname: "/tytusx/G30/reporte", datosCST: this.state.datosCST, datosCSTXML: this.state.datosCSTXML, datosAST: this.state.AST, graphviz: this.state.graphvizCST }}>
                                    Arboles
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ textDecoration: 'none' }} to={{ pathname: "/tytusx/G30/reporteTabla", XML: this.state.XML }}>
                                    Tabla Simbolos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ textDecoration: 'none' }} to={{ pathname: "/tytusx/G30/reporteGramatical", TablaGramatical: this.state.TablaGramatical, TablaGramticalXPath: this.state.TablaGramticalXPath }}>
                                    Gramaticales
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ textDecoration: 'none' }} to={{ pathname: "/tytusx/G30/reporteErrores", Mistakes: this.state.Mistakes, MistakesXPath: this.state.MistakesXPath }}>
                                    Errores
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <p></p>
                <p></p>
                <h1>OLC2 - Proyecto 2</h1>


                <div className="container">
                    <div className="row">

                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <p></p>
                        <p></p>
                        <h2>ENTRADA</h2>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 block">
                            <div className="row container">
                                <label className="labelClass">XML Input</label>
                                <CodeMirror
                                    className="codeMirror"
                                    value={this.state.XMLTextarea}
                                    options={{
                                        mode: 'xml',
                                        theme: 'dracula',
                                        lineNumbers: true,
                                        styleActiveLine: true,
                                        columnNumbers: true,
                                        inputStyle: 'textarea'
                                    }}
                                    onBlur={this.handleFocus}
                                    onChange={this.handleOnChangeXmlCode}
                                    placeholder="Bienvenido"
                                />
                            </div>
                            <p></p>
                            <div className="custom-file">
                                <input multiple={false} accept=".xml" id="fileinput" className="fileinput" type="file" ref={this.fileInput} onChange={this.handleSubmitXML} />
                                <label htmlFor="fileinput">Subir XML</label>
                                <a style={{ display: "none" }}
                                    download={"archivo.xml"}
                                    href={this.state.fileDownloadUrl}
                                    ref={e => this.dofileDownload = e}
                                >download it</a>
                                &emsp;
                                <button className="btn btn-secondary btn-lg" onClick={() => this.descargar()}>Descargar XML</button>
                            </div>

                        </div>
                        <div className="col-6 block">
                            <div className="row container">
                                <label className="labelClass">XQuery Input</label>
                                <CodeMirror
                                    className="codeMirror"
                                    value={this.state.InputTextarea}
                                    options={{
                                        mode: 'xquery',
                                        theme: 'dracula',
                                        lineNumbers: true,
                                        styleActiveLine: true,
                                        lineWrapping: true,
                                        columnNumbers: true,
                                        foldGutter: true,
                                        gutter: true,
                                    }}
                                    onChange={this.handleOnChangeXQueryCode}
                                    placeholder="Bienvenido"
                                />
                            </div>
                            <p></p>
                            <div className="custom-file">
                                <input multiple={false} accept=".xml" id="fileinput2" className="fileinput" type="file" ref={this.fileReader2} onChange={this.handleSubmitPath} />
                                <label htmlFor="fileinput2">Subir XPath</label>
                                &emsp;
                                <button type="submit" className="btn btn-primary btn-lg" onClick={() => this.botongeneral()}>Ejecutar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <p></p>
                    <div className="row">
                        <h2>SALIDA</h2>
                        <label className="labelClass">Consola</label>
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
                                    columnNumbers: true,
                                    foldGutter: true,
                                    gutter: true,
                                    readOnly: true,
                                }}
                                placeholder="Bienvenido"
                            />
                        </div>
                        <p></p>
                        <label className="labelClass">Código Tres Direcciones</label>
                        <div className="text-center">
                            <CodeMirror
                                className="codeMirror"
                                value={this.state.Codigo3D}
                                onChange={(event) => this.handleOpti(event)}
                                options={{
                                    mode: 'clike',
                                    theme: 'dracula',
                                    lineNumbers: true,
                                    styleActiveLine: true,
                                    lineWrapping: true,
                                    columnNumbers: true,
                                    foldGutter: true,
                                    gutter: true,
                                    readOnly: false,
                                }}
                                placeholder="Bienvenido"
                            />
                            <div className="custom-file">
                                <p></p>
                                <button type="submit" className="btn btn-primary btn-lg" onClick={() => this.optimizar()}>Optimizar</button>
                            </div>
                        </div>

                        <p></p>
                        <label className="labelClass">Reporte de Optimizacion</label>
                        <div>

                        </div>
                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="container"></div>

                <footer className="bg-dark text-center text-lg-start">
                    <div className="text-center p-3 text-light ">
                        <font size="3">
                            <p>Grupo 30<br /></p>
                        </font>
                    </div>
                </footer>

            </header>
        );
    }

}



export default Navigation;