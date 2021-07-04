"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoReturn = exports.Return = void 0;
const Consulta_1 = require("../XPath/Consulta");
class Return {
    constructor(tipoRet, identificador, listaNodos, html, ifthen, funcion, linea, columna) {
        this.tipo = tipoRet;
        this.funcion = funcion;
        this.html = html;
        this.listaNodos = listaNodos;
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.ifthen = ifthen;
    }
    ejecutar(XQEnt, xmlEnt) {
        //Ej: return $x/book
        //1. Buscar variable $id
        let pruebaReturn = "";
        let listaReturn = [];
        if (this.tipo === TipoReturn.NORMAL && this.identificador != undefined) {
            console.log("Return normal.");
            let ListaSimb = XQEnt.obtenerSimbolo(this.identificador);
            if (ListaSimb != null) {
                console.log("LISTAISMB:", ListaSimb);
                if (this.listaNodos != undefined && this.listaNodos.length > 0) {
                    let temp = new Consulta_1.Consulta(this.listaNodos, this.linea, this.columna);
                    ListaSimb.valor.forEach((simb) => {
                        let auxEntorno = simb.valor;
                        listaReturn = listaReturn.concat((temp.ejecutar(auxEntorno)));
                    });
                    pruebaReturn += temp.simbolosToString(listaReturn);
                }
                else {
                    let temp = new Consulta_1.Consulta([], this.linea, this.columna);
                    pruebaReturn += temp.simbolosToString(ListaSimb.valor);
                }
            }
            else {
                console.log("ERROR - El simbolo: $", this.identificador, " no existe.");
            }
        }
        else if (this.tipo === TipoReturn.FUNCIONXQUERY && this.funcion != undefined) {
            let temp = new Consulta_1.Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(this.funcion.getValor(XQEnt).valor);
        }
        else if (this.tipo === TipoReturn.IFTHENELSE && this.ifthen != undefined) {
            let nue = this.ifthen.ejecutar(XQEnt, xmlEnt);
            let temp = new Consulta_1.Consulta([], this.linea, this.columna);
            pruebaReturn += temp.simbolosToString(nue);
        }
        return pruebaReturn;
    }
}
exports.Return = Return;
var TipoReturn;
(function (TipoReturn) {
    TipoReturn[TipoReturn["NORMAL"] = 0] = "NORMAL";
    TipoReturn[TipoReturn["HTML"] = 1] = "HTML";
    TipoReturn[TipoReturn["IFTHENELSE"] = 2] = "IFTHENELSE";
    TipoReturn[TipoReturn["FUNCIONXQUERY"] = 3] = "FUNCIONXQUERY";
})(TipoReturn = exports.TipoReturn || (exports.TipoReturn = {}));
