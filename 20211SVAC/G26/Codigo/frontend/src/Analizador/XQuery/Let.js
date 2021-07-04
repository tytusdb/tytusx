"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Let = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Let {
    constructor(identifier, consultas, linea, columna, desde, hasta, listaEnteros, expresion) {
        this.linea = linea;
        this.columna = columna;
        this.consultas = consultas;
        this.listaEnteros = listaEnteros;
        this.identifier = identifier;
        this.expresion = expresion;
        if (desde != undefined && hasta != undefined) {
            this.desde = +desde;
            this.hasta = +hasta;
        }
    }
    ejecutar(XQEnt, xmlEnt) {
        console.log("Se ejecuta let");
        let listaSimbolos = [];
        if (this.consultas != undefined) {
            this.consultas.forEach((consulta) => {
                listaSimbolos.push(consulta.ejecutar(xmlEnt));
            });
            let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
        }
        else if (this.listaEnteros != undefined) {
            let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identifier, this.listaEnteros, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
        }
        else if (this.desde != undefined && this.hasta != undefined) {
            for (let i = this.desde; i <= this.hasta; i++) {
                console.log("i: ", i);
                listaSimbolos.push("" + i);
            }
            let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
            console.log("SIMBOLO: ", XQEnt.obtenerSimbolo(this.identifier));
        }
        else if (this.expresion != undefined) {
            let newSimb = new Simbolo_1.Simbolo(Tipo_1.Tipo.XQ_VAR, this.identifier, this.expresion.getValor(XQEnt), this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
        }
    }
}
exports.Let = Let;
