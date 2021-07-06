"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
class Funcion {
    constructor({ identificador_, tipo_, L_params_, L_ins_, entorno_, valor_ }) {
        this.identificador = identificador_;
        this.tipo = tipo_;
        this.L_params = L_params_;
        this.L_ins = L_ins_;
        this.entorno = entorno_;
        this.valor = valor_;
    }
    recorrer() {
        return `ID: ${this.identificador} - TIPO: ${this.tipoString(this.tipo)} - PARAMETROS: ${this.numeroParametros(this.L_params)} - VALOR: ${this.valor}\n`;
    }
    tipoString(i) {
        switch (i) {
            case 0:
                return " ERROR ";
            case 1:
                return " NUMBER ";
            case 2:
                return " STRING ";
            case 3:
                return " BOOLEAN ";
            case 4:
                return " ETIQUETA ";
            case 5:
                return " FUNCION ";
            case 6:
                return " ARREGLO ";
        }
        //ERROR,NUMBER,STRING, BOOLEAN, ETIQUETA, FUNCION, ARREGLO
        return "";
    }
    numeroParametros(nodo) {
        return nodo.hijos.length;
    }
}
exports.Funcion = Funcion;
