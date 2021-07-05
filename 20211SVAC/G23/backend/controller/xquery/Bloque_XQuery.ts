import { Ambito } from "../../model/xml/Ambito/Ambito";
import { Element } from "../../model/xml/Element";
import { Atributo } from "../../model/xml/Atributo";
import { Tipos } from "../../model/xpath/Enum";
import DobleEje from "../xpath/Instruccion/Selecting/DobleEje";
import Eje from "../xpath/Instruccion/Selecting/Eje";
import Axis from "../xpath/Instruccion/Selecting/Axis/Axis";
import ForLoop from "./For";
import { Contexto } from "../Contexto";
import LetClause from "./Let";
import IfConditional from "./If";
import returnQuery from "./Return";
import NewFunction from "./Funciones/NewFunction";
import Exec from "./Funciones/Exec";
import Nativa from "./Funciones/Nativas";

let reset: Contexto;
let output: Array<Contexto> = [];

function Bloque(_instruccion: Array<any>, _ambito: Ambito, _retorno: Contexto, id?: any): any {
    output = [];
    reset = _retorno;
    let tmp: Contexto;
    let i;
    for (i = 0; i < _instruccion.length; i++) {
        const instr = _instruccion[i];
        if (instr.tipo === Tipos.SELECT_FROM_ROOT || instr.tipo === Tipos.EXPRESION) {
            tmp = Eje(instr.expresion, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.SELECT_FROM_CURRENT) {
            tmp = DobleEje(instr.expresion, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.SELECT_AXIS) {
            tmp = Axis.SA(instr, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.LET_CLAUSE) {
            LetClause(instr.id, instr.valor, _ambito, _retorno, id);
            continue;
        }
        else if (instr.tipo === Tipos.DECLARACION_FUNCION) {
            NewFunction(instr, _ambito, _retorno);
            continue;
        }
        else if (instr.tipo === Tipos.FOR_LOOP) {
            return ForLoop(instr, _ambito, _retorno);
        }
        else if (instr.tipo === Tipos.LLAMADA_FUNCION) {
            return Exec(instr, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.LLAMADA_NATIVA) {
            return Nativa(instr, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.IF_THEN_ELSE) {
            return IfConditional(instr.condicionIf, instr.instruccionesThen, instr.instruccionesElse, _ambito, _retorno, id);
        }
        else if (instr.tipo === Tipos.RETURN_STATEMENT) {
            return returnQuery(instr.expresion, _ambito, [_retorno]);
        }
        else {
            return { error: "Error: Instrucción no procesada.", tipo: "Semántico", origen: "Query", linea: instr.linea, columna: instr.columna };
        }
        if (tmp === null || tmp.error) return tmp;
        if (tmp.notFound && i + 1 < _instruccion.length) { _retorno = reset; break; }
        _retorno = tmp;
    }
    if (i > 0 && _retorno)
        output.push(_retorno);
}

function getOutput(_instruccion: Array<any>, _ambito: Ambito, _retorno: Contexto) {
    let _bloque = Bloque(_instruccion, _ambito, _retorno);
    if (_bloque && _bloque.error) {
        if (_bloque.error.error) return _bloque.error;
        return _bloque;
    }
    /* let cadena = (_str.length > 0) ? _str.join('\n') : writeOutput(); */
    let cadena = (_bloque && _bloque.valor !== undefined) ? (_bloque.valor) : writeOutput();
    return { cadena: replaceEntity(String(cadena)) };
}

function getIterators(_instruccion: Array<any>, _ambito: Ambito, _retorno: Contexto, _id?: any): any {
    let _bloque = Bloque(_instruccion, _ambito, _retorno, _id);
    if (_bloque)
        return _bloque;
    if (output.length > 0)
        return output[output.length - 1];
    else return null;
}

function writeOutput() {
    let cadena = "";
    for (let i = 0; i < output.length; i++) {
        const path = output[i];
        if (path.cadena === Tipos.TEXTOS) {
            let root: Array<string> = path.texto;
            root.forEach(txt => {
                cadena += concatText(txt);
            });
        }
        else if (path.cadena === Tipos.ELEMENTOS) {
            let root: Array<Element> = path.elementos;
            root.forEach(element => {
                cadena += concatChilds(element, "");
            });
        }
        else if (path.cadena === Tipos.ATRIBUTOS) {
            if (path.atributos) {
                let root: Array<Atributo> = path.atributos; // <-- muestra sólo el atributo
                root.forEach(attr => {
                    cadena += concatAttributes(attr);
                });
            }
            else {
                let root: Array<Element> = path.elementos; // <-- muestra toda la etiqueta
                root.forEach(element => {
                    cadena += extractAttributes(element, "");
                });
            }
        }
        else if (path.cadena === Tipos.COMBINADO) {
            let root: Array<any> = path.nodos;
            root.forEach((elemento: any) => {
                if (elemento.elementos) {
                    cadena += concatChilds(elemento.elementos, "");
                }
                else if (elemento.textos) {
                    cadena += concatText(elemento.textos);
                }
            });
        }
    }
    if (cadena) return replaceEntity(cadena.substring(1));
    return "No se encontraron elementos.";
}

function replaceEntity(cadena: string) {
    const _lessThan = /&lt;/gi;
    const _greaterThan = /&gt;/gi;
    const _ampersand = /&amp;/gi;
    const _apostrophe = /&apos;/gi;
    const _quotation = /&quot;/gi;
    var salida = cadena.replace(_lessThan, "<").replace(_greaterThan, ">").replace(_ampersand, "&").replace(_apostrophe, "\'").replace(_quotation, "\"");
    return salida;
}

function concatChilds(_element: Element, cadena: string): string {
    cadena = ("\n<" + _element.id_open);
    if (_element.attributes) {
        _element.attributes.forEach(attribute => {
            cadena += (" " + attribute.id + "=\"" + attribute.value + "\"");
        });
    }
    if (_element.childs) {
        cadena += ">";
        _element.childs.forEach(child => {
            cadena += concatChilds(child, cadena);
        });
        cadena += ("\n</" + _element.id_close + ">");
    }
    else {
        if (_element.id_close === null)
            cadena += "/>";
        else {
            cadena += ">";
            cadena += (_element.value + "</" + _element.id_close + ">");
        }
    }
    return cadena;
}

function concatAttributes(_attribute: Atributo): string {
    return `\n${_attribute.id}="${_attribute.value}"`;
}

function extractAttributes(_element: Element, cadena: string): string {
    if (_element.attributes) {
        _element.attributes.forEach(attribute => {
            cadena += `\n${attribute.id}="${attribute.value}"`;
        });
    }
    return cadena;
}

function concatText(_text: string): string {
    return `\n${_text}`;
}

export = { Bloque: Bloque, getIterators: getIterators, getOutput: getOutput };