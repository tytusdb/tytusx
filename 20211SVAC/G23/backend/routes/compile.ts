import Bloque from '../controller/xpath/Instruccion/Bloque';
import { Ambito } from '../model/xml/Ambito/Ambito';
import { Global } from '../model/xml/Ambito/Global';
import { Element } from '../model/xml/Element';

function compile(req: any) {
    let errors = [];
    try {
        // Datos de la petición desde Angular
        let xml = req.xml;
        let xPath = req.query;
        let grammar_selected = req.grammar;

        // Gramáticas a usarse según la selección: 1=ascendente, 2=descendente
        let parser_xml, parser_xPath;
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

        // Análisis de XML
        let xml_ast = parser_xml.parse(xml);
        if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
            if (xml_ast.errors.length > 0) errors = xml_ast.errors;
            if (xml_ast.ast === null || xml_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
                return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }

        let xml_parse = xml_ast.ast; // AST que genera Jison
        let global = new Ambito(null, "global"); // Ámbito global
        let cadena = new Global(xml_parse, global); // Llena la tabla de símbolos
        let simbolos = cadena.ambito.getArraySymbols(); // Arreglo con los símbolos

        // Análisis de XPath
        let xPath_ast = parser_xPath.parse(xPath);
        if (xPath_ast.errors.length > 0 || xPath_ast.ast === null || xPath_ast === true) {
            if (xPath_ast.errors.length > 0) errors = xPath_ast.errors;
            if (xPath_ast.ast === null || xPath_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea de la consulta digitada.", origen: "XPath", linea: 1, columna: 1 });
                return { output: "La consulta contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }

        let root: Element = new Element("[object XMLDocument]", [], "", cadena.ambito.tablaSimbolos, "0", "0", "[object XMLDocument]")
        let output: any = { cadena: "", elementos: [root] };
        let xPath_parse = xPath_ast.ast; // AST que genera Jison
        let bloque = Bloque(xPath_parse, cadena.ambito, output); // Procesa la secuencia de accesos (instrucciones)
        if (bloque.error) {
            errors.push(bloque);
            return { arreglo_errores: errors, output: bloque.error }
        }

        output = {
            arreglo_simbolos: simbolos,
            arreglo_errores: errors,
            output: bloque
        }
        errors = [];
        return output;

    } catch (error) {
        console.log(error);
        errors.push({ tipo: "Desconocido", error: "Error en tiempo de ejecución.", origen: "", linea: "", columna: "" });
        let output = {
            arreglo_simbolos: [],
            arreglo_errores: errors,
            output: (error.message) ? String(error.message) : String(error)
        }
        errors = [];
        return output;
    }
}

export = { compile: compile };