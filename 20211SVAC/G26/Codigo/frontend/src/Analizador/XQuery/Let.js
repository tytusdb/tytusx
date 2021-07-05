import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
export class Let {
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
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        return code;
    }
    ejecutar(XQEnt, xmlEnt) {
        let listaSimbolos = [];
        if (this.consultas != undefined) {
            this.consultas.forEach((consulta) => {
                listaSimbolos.push(consulta.ejecutar(xmlEnt));
            });
            let newSimb = new Simbolo(Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
        }
        else if (this.listaEnteros != undefined) {
            let newSimb = new Simbolo(Tipo.XQ_VAR, this.identifier, this.listaEnteros, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
        }
        else if (this.desde != undefined && this.hasta != undefined) {
            for (let i = this.desde; i <= this.hasta; i++) {
                console.log("i: ", i);
                listaSimbolos.push("" + i);
            }
            let newSimb = new Simbolo(Tipo.XQ_VAR, this.identifier, listaSimbolos, this.linea, this.columna);
            XQEnt.agregarSimbolo(this.identifier, newSimb);
            console.log("SIMBOLO: ", XQEnt.obtenerSimbolo(this.identifier));
        }
    }
}
