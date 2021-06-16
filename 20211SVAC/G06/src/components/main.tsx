import React, { Component } from 'react'
import { crearTextoGraphvizCST, crearTextoGraphvizRepGram } from "../Reportes/NodoCST";
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col, NavDropdown } from 'react-bootstrap';
import { Graphviz } from 'graphviz-react';
import { crearTextoReporteErrorXML } from "../xmlAST/ClaseError";
import { crearTablaSimbolos, crearTextoGraphvizTablaSimbolos, SimboloTabla } from "../Reportes/SimboloTabla";
import { Entorno } from '../xmlAST/Entorno';
const parser = require('../Grammar/xmlGrammar');
const parserXmlDesc = require('../Grammar/xmlGrammarDesc');
const parserReport = require('../Reportes/xmlReport');
const parserReportDesc = require('../Reportes/xmlReportDesc');
const parseXPATH = require('../Grammar/XPATHparser');
const parseXPATHDesc = require('../Grammar/XPATHparserDesc');

export default class Main extends Component {

    state = {
        consoleResult: "",
        xpath: "",
        xml: "",
        repcsttxt: '',
        repgramtxt: '',
        repErrorXML: '',
        repTablaSimbolos: '',
        repAstXpath: '',
        graphvizContent: ''
    }

    parse = () => {
        let ast;
        let listaErrores = [];
        let TablaSimbolos = [];

        let repcsttxt2 = '';
        let repgramtxt2 = '';
        let repErrorXML2 = '';
        let repTablaSimbolos2 = '';

        let texto = "";
        let indice = 1;
        let entornoGlobal;
        let encoding = "";
        try {
            const result = parser.parse(this.state.xml)
            ast = result.ast;
            encoding = result.encoding;
            listaErrores = result.listaErrores;
            entornoGlobal = new Entorno('Global', '', 0, 0, [], ast);
            var buf = new Buffer("Hello World");
            console.log(buf.toString("ascii"));
            console.log("---------------------");
            console.log(buf.toString("utf8"));
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


        console.log(ast);
        console.log(encoding)
        console.log(listaErrores);


        try {
            const querys = parseXPATH.parse(this.state.xpath)
            console.log(querys)
            for (const key in querys) {
                texto = querys[key].GraficarAST(texto);
                if (indice < querys.length) {
                    texto += "nodo" + key.toString() + "[label=\"|\"];\n"
                    texto += "nodo" + querys[key].line.toString() + "_" + querys[key].column.toString() + "->nodo" + key.toString() + ";\n";
                    texto += "nodo" + key.toString() + "->nodo" + querys[indice].line.toString() + "_" + querys[indice].column.toString() + ";\n";
                    indice++;
                }
            }


            console.log(texto);

            this.setState({
                repAstXpath: "digraph G {" +texto +"}",
            });
            var erroresSemanticos: string[] = [];
            var salida = "";

            for (const query of querys) {
                try {
                    salida += query.execute(ast[0]).value;

                } catch (error) {
                    erroresSemanticos.push(error)
                }
            }
            console.log(salida);

            this.setState({
                consoleResult: salida,
            });

        } catch (error) {
            console.log(error);
        }

    }

    parseDesc = () => {
        let ast;
        let listaErrores = [];
        let TablaSimbolos = [];

        let repcsttxt2 = '';
        let repgramtxt2 = '';
        let repErrorXML2 = '';
        let repTablaSimbolos2 = '';
        let encoding = "";
        let texto = "";
        let indice = 1;
        let entornoGlobal;

        try {
            const result = parserXmlDesc.parse(this.state.xml)
            ast = result.ast;
            encoding = result.encoding;
            listaErrores = result.listaErrores;
            entornoGlobal = new Entorno('Global', '', 0, 0, [], ast);
            
            if (listaErrores.length === 0) {
                var xmlResRep = parserReportDesc.parse(this.state.xml);
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
        //console.log(ast)
        //console.log(listaErrores)
        try {
            const querysDesc = parseXPATHDesc.parse(this.state.xpath)
            console.log(querysDesc);
            for (const key in querysDesc) {
                texto = querysDesc[key].GraficarAST(texto);
                if (indice < querysDesc.length) {
                    texto += "nodo" + key.toString() + "[label=\"|\"];\n"
                    texto += "nodo" + querysDesc[key].line.toString() + "_" + querysDesc[key].column.toString() + "->nodo" + key.toString() + ";\n";
                    texto += "nodo" + key.toString() + "->nodo" + querysDesc[indice].line.toString() + "_" + querysDesc[indice].column.toString() + ";\n";
                    indice++;
                }
            }
            const querys2 = parseXPATH.parse(this.state.xpath)
            this.setState({
                repAstXpath: "digraph G {" +texto +"}",
            });
            var erroresSemanticos: string[] = [];
            var salida = "";
            for (const query of querys2) {
                try {
                    salida += query.execute(ast[0]).value;
                } catch (error) {
                    erroresSemanticos.push(error)
                }
            }
            console.log(salida);

            this.setState({
                consoleResult: salida
            });

        } catch (error) {
            console.log(error);
        }

        
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
        } else if (e.target.value === "AST Xpath") {
            this.setState({
                graphvizContent: this.state.repAstXpath
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
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                type="text"
                                placeholder="Insert your commands here"
                                value={this.state.xpath}
                                onChange={(e: any) => {
                                    this.setState({
                                        xpath: e.target.value
                                    })
                                }} />
                        </Col>
                        <Col xs={6} md={2}>
                            <Button variant="primary" onClick={this.parse}>RUN ASC</Button>
                        </Col>
                        <Col xs={6} md={2}>
                            <Button variant="primary" onClick={this.parseDesc}>RUN DESC</Button>
                        </Col>
                    </Row>
                    <br />
                    <Form.Control as="textarea" placeholder="XML AREA" rows={15} value={this.state.xml} onChange={(e: any) => {
                        this.setState({
                            xml: e.target.value
                        })
                    }} />
                </div>

                <div className="mt-3 px-5">
                    <Form.Group>
                        <Form.Control as="select" name="tier" size="lg" onChange={this.onChangeReports}>
                            <option>Ocultar</option>
                            <option>Tabla de simbolos XML</option>
                            <option>Reporte de errores XML</option>
                            <option>CST XML</option>
                            <option>Reporte gramatical XML</option>
                            <option>AST Xpath</option>
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
                    <Form.Control as="textarea" rows={6} value={this.state.consoleResult} readOnly />
                </div>
            </>
        )
    }
}