"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfThenElse = void 0;
class IfThenElse {
    constructor(identificador, condicion, respThen, respElse, fromRoot, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.condicion = condicion;
        this.condicionElse = respElse;
        this.condicionThen = respThen;
        this.fromRoot = fromRoot;
    }
    isFromRoot() {
        return this.fromRoot;
    }
    ejecutar(XQEnt, xmlEnt) {
        let nuevaLista = [];
        //1. Obtener simbolo
        let ls = XQEnt.obtenerSimbolo(this.identificador);
        //2. Ver si es fromRoot / o no //
        if (this.isFromRoot()) {
            //Es /, buscar la expresion solo sobre este entorno
            ls.valor.forEach((s) => {
                let et = s.valor;
                let respuesta = this.condicion.getValor(et);
                if (respuesta != null && respuesta != undefined) {
                    //Aplicarle la response del THEN
                    if (respuesta.tsimbolos !== undefined && respuesta.tsimbolos.length > 0) {
                        if (!this.condicionThen.isVacio()) {
                            nuevaLista = nuevaLista.concat(this.condicionThen.obtenerResponse(s));
                        }
                    }
                    else if (respuesta.tsimbolos === undefined && respuesta) {
                        if (!this.condicionThen.isVacio()) {
                            nuevaLista = nuevaLista.concat(this.condicionThen.obtenerResponse(s));
                        }
                    }
                    else {
                        //Aplicarle la respuesta del ELSE
                        if (!this.condicionElse.isVacio()) {
                            nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                        }
                    }
                }
                else {
                    //Aplicarle la respuesta del ELSE
                    if (!this.condicionElse.isVacio()) {
                        nuevaLista = nuevaLista.concat(this.condicionElse.obtenerResponse(s));
                    }
                }
            });
        }
        console.log("The nueva lista is: ", nuevaLista);
        return nuevaLista;
    }
}
exports.IfThenElse = IfThenElse;
