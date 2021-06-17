
function generateReport(req: any) {
    let errors = [];
    try {
        // Datos de la petición desde Angular
        let xml = req.xml;
        let xPath = req.query;
        let grammar_selected = req.grammar;
        let report = req.report;

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
        // Puede ser uno de los tres descritos
        switch (report) {
            case "XML-CST":
                return CST_xml(parser_xml, xml);
            case "XML-GRAMMAR":
                return GrammarReport_xml(parser_xml, xml);
            case "XPATH-AST":
                return AST_xpath(parser_xPath, xPath);
            default:
                return { output: "Algo salió mal." };
        }

    } catch (error) {
        console.log(error);
        errors.push({ tipo: "Desconocido", error: "Error en tiempo de ejecución.", origen: "", linea: "", columna: "" });
        let output = {
            arreglo_errores: errors,
            output: (error.message) ? String(error.message) : String(error),
            cst: ""
        }
        errors = [];
        return output;
    }
}

function CST_xml(parser_xml: any, xml: string) {
    let errors = [];
    // Análisis de XML
    let xml_ast = parser_xml.parse(xml);
    let _cst = xml_ast.cst;
    if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
        if (xml_ast.errors.length > 0) errors = xml_ast.errors;
        if (xml_ast.ast === null || xml_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    let output = {
        arreglo_errores: errors,
        output: "CST generado.",
        cst: _cst
    }
    return output;
}

function GrammarReport_xml(parser_xml: any, xml: string) {
    let errors = [];
    // Análisis de XML
    let xml_ast = parser_xml.parse(xml);
    let _grammar = xml_ast.grammar_report;
    if (xml_ast.errors.length > 0 || xml_ast.ast === null || xml_ast === true) {
        if (xml_ast.errors.length > 0) errors = xml_ast.errors;
        if (xml_ast.ast === null || xml_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    let output = {
        arreglo_errores: errors,
        output: "Reporte gramatical generado.",
        grammar_report: _grammar
    }
    return output;
}

function AST_xpath(parser_xpath: any, xpath: string) {
    let errors = [];
    // Análisis de XPath
    let xpath_ast = parser_xpath.parse(xpath);
    let _ast = xpath_ast.ast_report; //Confirmar nombre de propiedad
    if (xpath_ast.errors.length > 0 || xpath_ast.ast === null || xpath_ast === true) {
        if (xpath_ast.errors.length > 0) errors = xpath_ast.errors;
        if (xpath_ast.ast === null || xpath_ast === true) {
            errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: 1, columna: 1 });
            return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
        }
    }
    let output = {
        arreglo_errores: errors,
        output: "AST generado.",
        ast: _ast
    }
    return output;
}

export = { generateReport: generateReport };