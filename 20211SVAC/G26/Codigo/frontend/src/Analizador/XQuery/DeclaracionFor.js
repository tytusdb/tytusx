"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoFor = exports.DeclaracionFor = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class DeclaracionFor {
    constructor(tipo, identificador, consultas, linea, columna, at, desde, hasta, listaEnteros) {
        this.linea = linea;
        this.columna = columna;
        this.listaEnteros = listaEnteros;
        this.tipo = tipo;
        this.identificador = identificador;
        this.consultas = consultas;
        this.desde = desde;
        this.hasta = hasta;
        this.at = at;
    }
    getTipo() {
        return this.tipo;
    }
    TipoToString() {
        switch (this.tipo) {
            case TipoFor.NORMAL:
                return "Normal";
            case TipoFor.ITERATIVO:
                return "Iterativo";
            case TipoFor.AT:
                return "At";
        }
    }
    ejecutar(XQueryEnt, xmlEnt) {
        let listaSimbolos = [];
        let newSimb;
        switch (this.tipo) {
            case TipoFor.NORMAL:
                //ej: $x in /bookstore/book/asd
                console.log("for Normal");
                if (this.consultas != null) {
                    this.consultas.forEach((consulta) => {
                        listaSimbolos = listaSimbolos.concat(consulta.ejecutar(xmlEnt));
                    });
                }
                //A la variable $x (identificador) asignarle estos simbolos.
                newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                break;
            case TipoFor.ITERATIVO:
                //ej: $x in (3 to 5) o $x in (3, 4, 10, 200, 2, 1)
                if (this.desde && this.hasta != null) {
                    for (let i = this.desde; i <= this.hasta; i++) {
                        listaSimbolos.push(i);
                    }
                    let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                }
                else if (this.listaEnteros != undefined) {
                    let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identificador, this.listaEnteros, this.linea, this.columna);
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                }
                break;
            case TipoFor.AT:
                //ej: $x at $i in /bookstore/book/asd <-- $i, counts the iteration.
                let contador = 0;
                if (this.consultas != null) {
                    this.consultas.forEach((consulta) => {
                        let resp = consulta.ejecutar(xmlEnt);
                        contador += resp.length;
                        listaSimbolos = listaSimbolos.concat(resp);
                    });
                }
                //A la variable '$i' asignarle la longitud de mis consultas de resultado.
                let simbI = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_NUMB, this.identificador, contador, this.linea, this.columna);
                //A la variable $x (identificador) asignarle estos simbolos.
                newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                break;
        }
    }
}
exports.DeclaracionFor = DeclaracionFor;
var TipoFor;
(function (TipoFor) {
    TipoFor[TipoFor["NORMAL"] = 0] = "NORMAL";
    TipoFor[TipoFor["ITERATIVO"] = 1] = "ITERATIVO";
    TipoFor[TipoFor["AT"] = 2] = "AT";
})(TipoFor = exports.TipoFor || (exports.TipoFor = {}));
