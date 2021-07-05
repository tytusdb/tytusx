"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class temporal {
    constructor(id) {
        this.id = id;
        this.contador = 0;
        this.contadorEtiqueta = 0;
        this.idEtiqueta = "L";
    }
    aumentar() {
        this.contador++;
    }
    aumentarEtiqueta() {
        this.contadorEtiqueta++;
    }
    retornarString() {
        return this.id + this.contador;
    }
    retornarStringEtiqueta() {
        return this.idEtiqueta + this.contadorEtiqueta;
    }
}
exports.default = temporal;
