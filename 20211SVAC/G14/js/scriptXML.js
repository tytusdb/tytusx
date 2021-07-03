"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsearAscPath = exports.BuildSimbolTable = exports.ParsearDesc = exports.dot = exports.GraficarAST = exports.Graficar = exports.ParsearAsc = void 0;
var Simbolo_1 = require("../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../InterpreteXPath/AST/NodoAST"));
var gramaticaAsc = require("../InterpreteXML/GrammerXML/AscGrammer");
var gramaticaDesc = require("../InterpreteXML/GrammerXML/DescGrammer");
var gramaticaXpathAsc = require("../InterpreteXPath/GramaticaXPath/xpathAsc");
var dot = "";
exports.dot = dot;
var c = 0;
function ParsearAsc(entrada) {
    var objetos = gramaticaAsc.parse(entrada);
    //console.log(objetos);
    return objetos;
}
exports.ParsearAsc = ParsearAsc;
function ParsearDesc(entrada) {
    var objetos = gramaticaDesc.parse(entrada);
    //console.log(objetos);
    return objetos;
}
exports.ParsearDesc = ParsearDesc;
function ParsearAscPath(entrada) {
    var xpath = gramaticaXpathAsc.parse(entrada);
    return xpath;
}
exports.ParsearAscPath = ParsearAscPath;
function Graficar(datos) {
    var instr = new NodoAST_1.default("INICIO");
    datos.forEach(function (element) {
        instr.addHijo(element.obtenerNodos()[0]);
    });
    var grafo = "";
    grafo = getDot(instr);
}
exports.Graficar = Graficar;
function GraficarAST(datos) {
    var instr = new NodoAST_1.default("INICIO");
    datos.forEach(function (element) {
        instr.addHijo(element.ast());
    });
    var grafo = "";
    grafo = getDot(instr);
}
exports.GraficarAST = GraficarAST;
function getDot(raiz) {
    exports.dot = dot = "";
    exports.dot = dot += "digraph {\n";
    exports.dot = dot += 'n0[label="' + raiz.getValor().replace(/\"/g, "") + '"];\n';
    c = 1;
    recorrerAST("n0", raiz);
    exports.dot = dot += "}";
    return dot;
}
function recorrerAST(padre, nPadre) {
    for (var _i = 0, _a = nPadre.getHijos(); _i < _a.length; _i++) {
        var hijo = _a[_i];
        var nombreHijo = "n" + c;
        exports.dot = dot += nombreHijo + '[label="' + hijo.getValor().replace(/\"/g, "") + '"];\n';
        exports.dot = dot += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    }
}
function BuildSimbolTable(listado) {
    var global = new Simbolo_1.Simbolo("Global", TipoDato_1.TipoDato.ARRAY, "", 0, 0);
    var root = new Simbolo_1.Simbolo(listado.identificador, TipoDato_1.TipoDato.ETIQUETA, listado.texto, listado.linea, listado.columna);
    global.entorno.push(root);
    buildGlobal(root, listado);
    return global;
}
exports.BuildSimbolTable = BuildSimbolTable;
function buildGlobal(entorno, padre) {
    if (padre.lista != null) {
        getEtiqueta(entorno, padre.lista, TipoDato_1.TipoDato.ATRIBUTO);
    }
    if (padre.listaObjetos != null) {
        getEtiqueta(entorno, padre.listaObjetos, TipoDato_1.TipoDato.ETIQUETA);
    }
}
function getEtiqueta(entorno, padre, tipo) {
    if (padre.etiqueta != null) {
        if (padre.etiqueta.identificador == "objeto" || padre.etiqueta.identificador == "atributo") {
            getEtiqueta(entorno, padre.etiqueta, tipo);
        }
        else {
            if (tipo == TipoDato_1.TipoDato.ATRIBUTO) {
                getValorAtributo(entorno, padre.etiqueta);
            }
            else {
                getValorObjeto(entorno, padre.etiqueta);
            }
        }
    }
    if (padre.valor != null) {
        if (padre.valor.identificador === "objeto" || padre.valor.identificador === "atributo") {
            getEtiqueta(entorno, padre.valor, tipo);
        }
        else {
            if (tipo == TipoDato_1.TipoDato.ATRIBUTO) {
                getValorAtributo(entorno, padre.valor);
            }
            else {
                getValorObjeto(entorno, padre.valor);
            }
        }
    }
}
function getValorAtributo(entorno, padre) {
    var cont = BuscarRepetido(entorno, padre.identificador);
    var root;
    if (cont > 0) {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ATRIBUTO, padre.valor, padre.fila, padre.columna, cont);
    }
    else {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ATRIBUTO, padre.valor, padre.fila, padre.columna);
    }
    entorno.entorno.push(root);
}
function getValorObjeto(entorno, padre) {
    var cont = BuscarRepetido(entorno, padre.identificador);
    var root;
    if (cont > 0) {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ETIQUETA, padre.texto, padre.fila, padre.columna, cont);
    }
    else {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ETIQUETA, padre.texto, padre.fila, padre.columna);
    }
    entorno.entorno.push(root);
    if (padre.lista != null || padre.listaObjetos != null) {
        buildGlobal(root, padre);
    }
}
function BuscarRepetido(entorno, identi) {
    var id = identi;
    var i = 0;
    var aux = 0;
    for (i; i < entorno.entorno.length; i++) {
        if (id === entorno.entorno[i].id) {
            aux++;
        }
    }
    return aux;
}
