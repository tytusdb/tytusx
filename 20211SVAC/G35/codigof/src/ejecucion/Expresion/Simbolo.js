"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor({ identificador_, tipo_, valor_ }) {
        this.identificador = identificador_;
        this.tipo = tipo_;
        this.valor = valor_;
    }
    recorrer() {
        return `ID: ${this.identificador} - TIPO: ${this.tipoString(this.tipo)} - VALOR: ${this.valor}\n`;
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
}
exports.Simbolo = Simbolo;
