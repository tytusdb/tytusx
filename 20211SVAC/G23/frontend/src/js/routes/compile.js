"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Bloque_1 = __importDefault(require("../controller/xpath/Instruccion/Bloque"));
var Ambito_1 = require("../model/xml/Ambito/Ambito");
var Global_1 = require("../model/xml/Ambito/Global");
var Element_1 = require("../model/xml/Element");
function compile(req) {
    var errors = [];
    try {
        // Datos de la petición desde Angular
        var xml = req.xml;
        var xPath = req.query;
        var grammar_selected = req.grammar;
        // Gramáticas a usarse según la selección: 1=ascendente, 2=descendente
        var parser_xml = void 0, parser_xPath = void 0;
        switch (grammar_selected) {
            case 1:
                parser_xml = require('../analyzers/xml_up');
                parser_xPath = require('../analyzers/xpath_up');
                break;
            case 2:
                parser_xml = require('../analyzers/xml_up');
                parser_xPath = require('../analyzers/xpath_up');
                break;
        }
        // Análisis de XML
        var xml_ast = parser_xml.parse(xml);
        var encoding = xml_ast.encoding; // Encoding del documento XML
        if (encoding.encoding === encoding.codes.INVALID) {
            errors.push({ tipo: "Léxico", error: "La codificación del XML no es válida.", origen: "XML", linea: "1", columna: "1" });
        }
        if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
            if (xml_ast.errors.length > 0)
                errors = xml_ast.errors;
            if (xml_ast.ast === null || xml_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
                return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }
        var xml_parse = xml_ast.ast; // AST que genera Jison
        var global_1 = new Ambito_1.Ambito(null, "global"); // Ámbito global
        var cadena = new Global_1.Global(xml_parse, global_1); // Llena la tabla de símbolos
        var simbolos = cadena.ambito.getArraySymbols(); // Arreglo con los símbolos
        // Análisis de XPath
        var xPath_ast = parser_xPath.parse(xPath);
        if (xPath_ast.errors.length > 0 || xPath_ast.ast === null || xPath_ast === true) {
            if (xPath_ast.errors.length > 0)
                errors = xPath_ast.errors;
            if (xPath_ast.ast === null || xPath_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea de la consulta digitada.", origen: "XPath", linea: 1, columna: 1 });
                return { output: "La consulta contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }
        var root = new Element_1.Element("[object XMLDocument]", [], "", cadena.ambito.tablaSimbolos, "0", "0", "[object XMLDocument]");
        var output = { cadena: "", elementos: [root], atributos: null };
        var xPath_parse = xPath_ast.ast; // AST que genera Jison
        var bloque = Bloque_1.default(xPath_parse, cadena.ambito, output); // Procesa la secuencia de accesos (instrucciones)
        if (bloque.error) {
            errors.push(bloque);
            return { arreglo_errores: errors, output: bloque.error };
        }
        output = {
            arreglo_simbolos: simbolos,
            arreglo_errores: errors,
            output: bloque,
            encoding: encoding
        };
        errors = [];
        return output;
    }
    catch (error) {
        console.log(error);
        errors.push({ tipo: "Desconocido", error: "Error en tiempo de ejecución.", origen: "", linea: "", columna: "" });
        var output = {
            arreglo_simbolos: [],
            arreglo_errores: errors,
            output: (error.message) ? ("Error sintáctico:\n" + String(error.message)) : String(error),
            encoding: "utf-8"
        };
        errors = [];
        return output;
    }
}
module.exports = { compile: compile };
