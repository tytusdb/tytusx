import React, { Component } from 'react'
import { crearTextoGraphvizCST, crearTextoGraphvizRepGram } from "../Reportes/NodoCST";
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col, NavDropdown } from 'react-bootstrap';
import { Graphviz } from 'graphviz-react';
import { crearTextoReporteErrorXML } from "../xmlAST/ClaseError";
import { crearTablaSimbolos, crearTextoGraphvizTablaSimbolos, SimboloTabla } from "../Reportes/SimboloTabla";
import { traducirXml, TraducirXPATH } from "../Traduccion/xml3d";
import { Entorno } from '../xmlAST/Entorno';
import { traduccion } from '../Traduccion/traduccion';
import { EntornoXQuery } from '../xqueryAST/AmbientesXquery/EntornoXQuery';
import { ManejadorXquery } from '../xqueryAST/manejadores/ManejadorXquery';
import { Retorno } from '../Interfaces/ExpressionXquery';
import { tipoPrimitivo } from '../xqueryAST/ExpresionesXpath/Primitivo';
const parser = require('../Grammar/xmlGrammar');
const parserReport = require('../Reportes/xmlReport');
const parseXPATH = require('../Grammar/XPATHparser');
const parseXQuery = require('../Grammar/xQueryGrammar');
const parseXQueryTraduccion = require('../Grammar/xQueryGrammarTraduccion');
const parseC3D = require('../Grammar/C3DGrammar');



const utf8 = require('utf8');

export default class Main extends Component {

    state = {
        consoleResult: "",
        xpath: "",
        xml: "",
        xquery: "",
        repcsttxt: '',
        repgramtxt: '',
        repErrorXML: '',
        repErrorXPATH: '',
        repTablaSimbolos: '',
        repAstXpath: '',
        graphvizContent: '',
        repOptimizaciones: '',
        repastxquery: '',
        TSXquery: '' 
    }

    parse = () => {
        let ast;
        let listaErrores = [];
        let TablaSimbolos = [];
        let repcsttxt2 = '';
        let repgramtxt2 = '';
        let repErrorXML2 = '';
        let repTablaSimbolos2 = '';
        let RepErrorXPATHASC = '';
        let texto = "";
        let indice = 1;
        let entornoGlobal;
        let encoding = "";
        //XML------------------------------------------------------------------------
        try {
            const result = parser.parse(this.state.xml)
            ast = result.ast;
            traducirXml(ast);
            encoding = result.encoding;
            listaErrores = result.listaErrores;
            entornoGlobal = new Entorno('Global', '', 0, 0, [], ast);

            if (listaErrores.length === 0) {
                var xmlResRep = parserReport.parse(this.state.xml);
                this.setState({
                    repgramtxt: "digraph G {" + crearTextoGraphvizRepGram(xmlResRep.ReporteGramatical[0], xmlResRep.ReporteGramatical[1], repgramtxt2) + "}",
                    repcsttxt: "digraph G {" + crearTextoGraphvizCST(xmlResRep.ReporteCST, repcsttxt2) + "}",
                    repTablaSimbolos: "digraph G {" + crearTextoGraphvizTablaSimbolos(crearTablaSimbolos(entornoGlobal, TablaSimbolos, "Global"), repTablaSimbolos2) + "}"
                })
            } else {
                this.setState({
                    repErrorXML: "digraph G {" + crearTextoReporteErrorXML(listaErrores, repErrorXML2) + "}"
                })
            }
        } catch (error) {
            console.log(error)
            alert("Irrecoverable Xml Syntax Error")
        }
        //XPATH---------------------------------------------------------------------------
        try {
            const querys = parseXPATH.parse(this.state.xpath)
            var querysXpath = querys.xpath;
            console.log(querysXpath);
            var erroresXpath = querys.listaErrores;
            //REPORTE AST y ERRORES PARA XPATH************************************************************
            if (erroresXpath.length === 0) {
                for (const key in querysXpath) {
                    texto = querysXpath[key].GraficarAST(texto);
                    if (indice < querysXpath.length) {
                        texto += "nodo" + key.toString() + "[label=\"|\"];\n"
                        texto += "nodo" + querysXpath[key].line.toString() + "_" + querysXpath[key].column.toString() + "->nodo" + key.toString() + ";\n";
                        texto += "nodo" + key.toString() + "->nodo" + querysXpath[indice].line.toString() + "_" + querysXpath[indice].column.toString() + ";\n";
                        indice++;
                    }
                }
                this.setState({
                    repAstXpath: "digraph G {" + texto + "}",
                });
            } else {
                console.log(erroresXpath.length)
                this.setState({
                    repErrorXPATH: "digraph G {" + crearTextoReporteErrorXML(erroresXpath, RepErrorXPATHASC) + "}"
                })
            }

            console.log(texto);

            this.setState({
                repAstXpath: "digraph G {" + texto + "}",
            });

            //EJECUCION DE XPATH----------------------------------------------------------------------------------------------------------------------------------------------
            var erroresSemanticos: string[] = [];
            var salida = "";
            for (const query of querysXpath) {
                try {
                    salida += query.execute(ast[0]).value;
                } catch (error) {
                    erroresSemanticos.push(error)
                }
            }

            this.setState({
                consoleResult: "//CONSULTA-----------------\n\n/*\n" + salida + "*/\n\n//TRADUCCION-----------------\n\n" + traduccion.getTranslate(),
            });

        } catch (error) {
            console.log(error);
        }
    }

    //TRADUCCION DE XPATH----------------------------------------------------------------------------------------------------------------------------------------------
    traducir = () => {

        if (this.state.xml === "") {
            return;
        }
        
        const result = parser.parse(this.state.xml);
        const querys = parseXPATH.parse(this.state.xpath);
        var querysXpath = querys.xpath;
        var ast = result.ast;
        var respuesta = "";
        console.log(querysXpath);
        traducirXml(ast);
        for (const query of querysXpath) {
            try {
                respuesta += query.execute(ast[0]).value;
            } catch (error) {
                console.log(error);
            }
        }
        this.setState({
            consoleResult: "//CONSULTA-----------------\n\n/*\n" + respuesta + "*/\n\n//TRADUCCION-----------------\n\n" + traduccion.getTranslate(),
        });
    }

    //METODO PARA QUE DEIVID EJECUTE XQUERY################################################################
    executeXquery = () => {
        let texto = "";
        const result = parser.parse(this.state.xml)
        var ast = result.ast;

        const astXquery = parseXQuery.parse(this.state.xquery);
        var salida = "";

        console.log(astXquery);

        texto += "nodoPadre[label=\"ListaQueries\"];\n";
        for (const key in astXquery) {
            texto = astXquery[key].GraficarAST(texto);
            texto += "nodoPadre -> nodo" + astXquery[key].line.toString()  + "_" + astXquery[key].column.toString() + ";\n";
        }

        this.setState({
            repastxquery: "digraph G {" + texto + "}"
        })

        var nvoEntorno = new EntornoXQuery(null, "global");
        nvoEntorno.graphTS = `digraph G {
        parent [
            shape=plaintext
            label=<
            <table border='0' cellborder='1' cellspacing='0'>
            <tr><td colspan="6">              Tabla de simbolos de xquery              </td></tr>
            <tr><td bgcolor="yellow">Linea</td><td bgcolor="yellow">Columna</td><td bgcolor="yellow">Ambito</td><td bgcolor="yellow">Nombre</td><td bgcolor="yellow">Tipo</td><td bgcolor="yellow">valor</td></tr>` 

        for (const xquery of astXquery) {
            try {

                const result: Retorno = xquery.executeXquery(nvoEntorno, ast[0]);
                if (result.type === tipoPrimitivo.RESP){
                    salida += ManejadorXquery.graficarXquery(result.value) + "\n";
                }else if (result.type === tipoPrimitivo.NODO){
                    salida += ManejadorXquery.unirSalida(ManejadorXquery.graficarNodos(result.value, "")) + "\n";
                }else if (result.type !== tipoPrimitivo.VOID) {
                    salida += result.value + "\n";
                }
                
            } catch (error) {
                console.log(error)
            }
        }

        nvoEntorno.getAllVars();
        nvoEntorno.graphTS += `</table>\n>];\n}`
        //console.log(nvoEntorno.graphTS)

        this.setState({
            consoleResult: salida,
            TSXquery : nvoEntorno.graphTS
        });

    }
    //######################################################################################################


    //TRADUCCION XQUERY################################################################
    traduccionXquery = () => {
        let texto = "";
        const result = parser.parse(this.state.xml)
        var ast = result.ast;
        result.encoding =  result.encoding.replaceAll("\"","");
        //TRADUCCION3D##########################################################################################
        traduccion.stackCounter++;
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("\n//INTRODUCIENDO ENCODING\t--------------");

        for (let i = 0; i < result.encoding.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + result.encoding.charCodeAt(i) + ";" + "\t\t//Caracter " + result.encoding[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === result.encoding.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        //#######################################################################################################
        traducirXml(ast);

        const astXquery = parseXQueryTraduccion.parse(this.state.xquery);
        var salida = "";

        console.log(astXquery);
        texto += "nodoPadre[label=\"/\"];\n";
        for (const key in astXquery) {
            texto = astXquery[key].GraficarAST(texto);
            texto += "nodoPadre -> nodo" + astXquery[key].line.toString()  + "_" + astXquery[key].column.toString() + ";\n";
        }

        this.setState({
            repastxquery: "digraph G {" + texto + "}"
        })

        var nvoEntorno = new EntornoXQuery(null, "global");
        for (const xquery of astXquery) {
            try {
                salida += xquery.executeXquery(nvoEntorno, ast[0]).value + "\n";
            } catch (error) {
                console.log(error)
            }
        }

        this.setState({
            consoleResult: "//CONSULTA XQUERY-----------------\n\n/*\n" + salida + "*/\n\n//TRADUCCION C3D XQUERY-----------------\n\n" + traduccion.getTranslate(),
        });

    }
    //######################################################################################################

    optimizar = () => {
        //const optimizado = parseC3D.parse(this.state.xml);
        const optimizado = parseC3D.parse(this.state.consoleResult);
        this.setState({
            consoleResult: "//OPTIMIZACION-----------------\n" + optimizado.Optimizado,
        });
        this.setState({
            repOptimizaciones: "digraph G {" + optimizado.TextGraphviz + "}",
        });
    }

    handleFileChange = file => {

        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            try {
                this.setState({
                    xml: e.target.result
                });
            } catch (e) {
                console.log(e);
            }
        };
    };
    handleFileChangeXpath = file => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            //console.log(e.target.result)
            try {
                this.setState({
                    xpath: e.target.result
                });
            } catch (e) {
                console.log(e);
            }
        };
    };
    onChangeReports = e => {
        //console.log(this.state.graphvizContent)
        if (e.target.value === "Ocultar") {
            this.setState({
                graphvizContent: ''
            })
        } else if (e.target.value === "CST XML") {
            this.setState({
                graphvizContent: this.state.repcsttxt
            })
        } else if (e.target.value === "Reporte gramatical XML") {
            this.setState({
                graphvizContent: this.state.repgramtxt
            })
        } else if (e.target.value === "Reporte de errores XML") {
            this.setState({
                graphvizContent: this.state.repErrorXML
            })
        } else if (e.target.value === "Tabla de simbolos XML") {
            this.setState({
                graphvizContent: this.state.repTablaSimbolos
            })
        } else if (e.target.value === "AST XPath") {
            this.setState({
                graphvizContent: this.state.repAstXpath
            })
        } else if (e.target.value === "Reporte de errores XPath") {
            this.setState({
                graphvizContent: this.state.repErrorXPATH
            })
        } else if (e.target.value === "Reporte de Optimizaciones") {
            this.setState({
                graphvizContent: this.state.repOptimizaciones
            })
        } else if (e.target.value === "AST XQuery") {
            this.setState({
                graphvizContent: this.state.repastxquery
            })
        }else if (e.target.value === "Tabla de Simbolos Xquery") {
            this.setState({
                graphvizContent: this.state.TSXquery
            })
        }

    }
    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/py_compi2">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Open File" id="navbarScrollingDropdown">
                                <FilePicker maxSize={2} onChange={this.handleFileChangeXpath} onError={errMsg => console.log(errMsg)}>
                                    <NavDropdown.Item >Xpath File</NavDropdown.Item>
                                </FilePicker>
                                <FilePicker maxSize={2} onChange={this.handleFileChange} onError={errMsg => console.log(errMsg)}>
                                    <NavDropdown.Item >XML File</NavDropdown.Item>
                                </FilePicker>
                            </NavDropdown>
                            <NavDropdown title="Clean" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => {
                                    this.setState({
                                        xpath: ''
                                    })
                                }} >Xpath</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    this.setState({
                                        xml: ''
                                    })
                                }} >XML</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Save" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => {
                                    var fileDownload = require('js-file-download');
                                    fileDownload(this.state.xpath, 'xpath.txt');
                                }} >Xpath</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    var fileDownload = require('js-file-download');
                                    fileDownload(this.state.xml, 'xml.txt');
                                }} >XML</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="mt-2 px-5">

                    <Form.Control
                        type="text"
                        placeholder="XPATH AREA"
                        value={this.state.xpath}
                        onChange={(e: any) => {
                            this.setState({
                                xpath: e.target.value
                            })
                        }} />

                    <br />

                    <Row>

                        <Col xs={6} md={3}>
                            <Button variant="primary" onClick={this.parse}>TRANSALATE XPATH</Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button variant="primary" onClick={this.traduccionXquery}>TRANSALATE XQUERY</Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button variant="primary" onClick={this.executeXquery}>EXECUTE XQUERY</Button>
                        </Col>
                        <Col xs={12} md={3}>
                            <Button variant="primary" onClick={this.optimizar}>OPTIMIZE</Button>
                        </Col>

                    </Row>

                    <br />
                    <Row>
                        <Col xs={12} md={0}>

                        </Col>
                        <Col xs={6} md={6}>
                            <Form.Control as="textarea" placeholder="XML AREA" rows={15} value={this.state.xml} onChange={(e: any) => {
                                this.setState({
                                    xml: e.target.value
                                })
                            }} />
                        </Col>
                        <Col xs={6} md={6}>
                            <Form.Control as="textarea" placeholder="XQUERY AREA" rows={15} value={this.state.xquery} onChange={(e: any) => {
                                this.setState({
                                    xquery: e.target.value
                                })
                            }} />
                        </Col>
                    </Row>

                </div>

                <div className="mt-3 px-5">
                    <Form.Group>
                        <Form.Control as="select" name="tier" size="lg" onChange={this.onChangeReports}>
                            <option>Ocultar</option>
                            <option>Tabla de simbolos XML</option>
                            <option>Reporte de errores XML</option>
                            <option>CST XML</option>
                            <option>Reporte gramatical XML</option>
                            <option>AST XPath</option>
                            <option>Reporte de errores XPath</option>
                            <option>Reporte de Optimizaciones</option>
                            <option>AST XQuery</option>
                            <option>Tabla de Simbolos Xquery</option>
                        </Form.Control>
                    </Form.Group>
                </div>


                {
                    this.state.graphvizContent !== '' ? (
                        <div className="m-5  border border-primary">
                            <Graphviz className="m-1 d-flex justify-content-center" dot={this.state.graphvizContent} options={{ height: 750, width: 1485, zoom: true }} />
                        </div>
                    ) : <div></div>
                }

                <div className="mt-3 px-5">
                    <Form.Control as="textarea" rows={30} value={this.state.consoleResult} onChange={(e: any) => {
                        this.setState({
                            consoleResult: e.target.value
                        })
                    }} />
                </div>
            </>
        )
    }
}
