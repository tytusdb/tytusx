"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcion_nativa = void 0;
const instruccion_1 = require("../interfaces/instruccion");
const identificador_1 = require("./identificador");
const primitivo_1 = require("./primitivo");
class funcion_nativa extends instruccion_1.Instruccion {
    constructor(linea, id, valor, inicio = null, fin = null) {
        super(linea);
        Object.assign(this, { id, valor, inicio, fin });
    }
    //falta retorno si es INST y se manda a llamar desde una variable, path 
    ejecutar(e) {
        if (this.valor instanceof identificador_1.identificador) {
            this.valor = this.valor.ejecutar(e);
        }
        if (this.valor instanceof primitivo_1.Primitivo) {
            this.valor = this.valor.ejecutar(e);
        }
        if (this.id == 'F_UPPERCASE') {
            let cadena = this.valor.toUpperCase();
            return cadena;
        }
        if (this.id == 'F_LOWERCASE') {
            let cadena = this.valor.toLowerCase();
            return cadena;
        }
        if (this.id == 'F_STRING') {
            let cadena = this.valor.toString();
            return cadena;
        }
        if (this.id == 'F_NUMBER') {
            let cadena = Number(this.valor);
            return cadena;
        }
        if (this.id == 'F_SUBSTRING') {
            let inicial = this.inicio;
            let cadena = this.valor.substring(inicial);
            this.inicio = 0;
            return cadena;
        }
        if (this.id == 'F_SUBSTRING1') {
            let cadena = this.valor.substring(this.inicio, this.fin + 1);
            this.fin = 0;
            this.inicio = 0;
            return cadena;
        }
    }
}
exports.funcion_nativa = funcion_nativa;
