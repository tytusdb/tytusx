"use strict";
function generateReport(req) {
    var errors = [];
    try {
        // Datos de la petición desde Angular
        var xml = req.xml;
        var xPath = req.query;
        var grammar_selected = req.grammar;
        var report = req.report;
        // Gramáticas a usarse según la selección: 1=ascendente, 2=descendente
        var parser_xml = void 0, parser_xPath = void 0;
        switch (grammar_selected) {
            case 1:
                parser_xml = require('../analyzers/xml_up');
                parser_xPath = require('../analyzers/xpath_up');
                break;
            case 2:
                parser_xml = require('../analyzers/xml_down');
                parser_xPath = require('../analyzers/xpath_down');
                break;
        }
        switch (report) {
            case "XML-CST":
                return CST_xml(parser_xml, xml);
            case "XML-GRAMMAR":
                return GrammarReport_xml(parser_xml, xml);
            case "XPATH-AST":
                return AST_xml(parser_xml, xml); // Se dejó el del xml
            default:
                return { output: "Algo salió mal." };
        }
    }
    catch (error) {
        console.log(error);
        errors.push({ tipo: "Desconocido", error: "Error en tiempo de ejecución.", origen: "", linea: "", columna: "" });
        var output = {
            arreglo_errores: errors,
            output: (error.message) ? String(error.message) : String(error),
            cst: ""
        };
        errors = [];
        return output;
    }
}
function CST_xml(parser_xml, xml) {
    var errors = [];
    // Análisis de XML
    var xml_ast = parser_xml.parse(xml);
    var _cst = xml_ast.cst;
    if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
        if (xml_ast.errors.length > 0)
            errors = xml_ast.errors;
        if (xml_ast.ast === null || xml_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    var output = {
        arreglo_errores: errors,
        output: "CST generado.",
        cst: _cst
    };
    return output;
}
function GrammarReport_xml(parser_xml, xml) {
    var errors = [];
    // Análisis de XML
    var xml_ast = parser_xml.parse(xml);
    var _grammar = xml_ast.grammar_report;
    if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
        if (xml_ast.errors.length > 0)
            errors = xml_ast.errors;
        if (xml_ast.ast === null || xml_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    var output = {
        arreglo_errores: errors,
        output: "Reporte gramatical generado.",
        grammar_report: _grammar
    };
    return output;
}
function AST_xml(parser_xml, xml) {
    var errors = [];
    // Análisis de XML
    var xpath_xml = parser_xml.parse(xml);
    var _ast = xpath_xml.ast;
    if (xpath_xml.errors.length > 0 || xpath_xml.ast === null || xpath_xml === true) {
        if (xpath_xml.errors.length > 0)
            errors = xpath_xml.errors;
        if (xpath_xml.ast === null || xpath_xml === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    var str = _ast[0].getASTXMLTree();
    var output = {
        arreglo_errores: errors,
        output: "AST generado.",
        ast: str
    };
    return output;
}
function AST_xpath(parser_xpath, xpath) {
    var errors = [];
    // Análisis de XPath
    var xpath_ast = parser_xpath.parse(xpath);
    var _ast = xpath_ast.arbolAST;
    if (xpath_ast.errors.length > 0 || xpath_ast.ast === null || xpath_ast === true) {
        if (xpath_ast.errors.length > 0)
            errors = xpath_ast.errors;
        if (xpath_ast.ast === null || xpath_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea de la consulta.", origen: "XPath", linea: 1, columna: 1 });
            return { output: "La consulta contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    var output = {
        arreglo_errores: errors,
        output: "AST generado.",
        ast: _ast
    };
    return output;
}
module.exports = { generateReport: generateReport };
