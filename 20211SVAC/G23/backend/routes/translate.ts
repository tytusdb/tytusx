import { XQueryTranslator } from "../c_translator/xQueryTranslator";

function translate(req: any) {
    let errors: Array<any> = [];
    try {
        // Datos de la petición desde Angular
        let xml = req.xml;
        let xQuery = req.query;

        let parser_xml = require('../analyzers/xml_up');
        let parser_xQuery = require('../analyzers/xquery');

        // Análisis de XML
        let xml_ast = parser_xml.parse(xml);
        let xml_parse = xml_ast.ast; // AST que genera Jison
        let encoding = xml_ast.encoding; // Encoding del documento XML
        if (encoding.encoding === encoding.codes.INVALID) {
            errors.push({ tipo: "Léxico", error: "La codificación del XML no es válida.", origen: "XML", linea: "1", columna: "1" });
        }
        if (xml_ast.errors.length > 0 || xml_parse === null || xml_ast === true) {
            if (xml_ast.errors.length > 0) errors = errors.concat(xml_ast.errors);
            if (xml_parse === null || xml_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: "1", columna: "1" });
                return { output: "El documento XML contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }


        // Análisis de xQuery
        let xQuery_ast = parser_xQuery.parse(xQuery);
        let xquery_parse = (xQuery_ast.xquery) ? (xQuery_ast.xquery) : (xQuery_ast.xpath); // AST que genera Jison
        if (xQuery_ast.errors.length > 0 || xquery_parse === null || xQuery_ast === true) {
            if (xQuery_ast.errors.length > 0) errors = xQuery_ast.errors;
            if (xquery_parse === null || xQuery_ast === true) {
                errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea de la consulta digitada.", origen: "XQuery", linea: "1", columna: "1" });
                return { output: "La consulta contiene errores para analizar.\nIntente de nuevo.", arreglo_errores: errors };
            }
        }

        let xQueryTranslator = new XQueryTranslator(xQuery_ast, xml_parse[0]);
        xQueryTranslator.translate();
        let code = xQueryTranslator.getCode();

        let output = {
            arreglo_errores: errors,
            output: code,
        }
        errors = [];
        return output;

    } catch (error) {
        console.log(error);
        if (error.message) errors.push({ tipo: "Sintáctico", error: String(error.message), origen: "Entrada", linea: "", columna: "" });
        else errors.push({ tipo: "Desconocido", error: "Error en tiempo de ejecución.", origen: "", linea: "", columna: "" });
        let output = {
            arreglo_simbolos: [],
            arreglo_errores: errors,
            output: (error.message) ? String(error.message) : String(error),
            encoding: "utf-8"
        }
        errors = [];
        return output;
    }
}

export = { translate: translate };