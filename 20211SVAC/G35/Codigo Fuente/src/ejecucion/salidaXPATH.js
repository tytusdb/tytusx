"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salidaXPATH = void 0;
class salidaXPATH {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!salidaXPATH.instance) {
            salidaXPATH.instance = new salidaXPATH();
        }
        return salidaXPATH.instance;
    }
    push(linea) {
        this.lista.push(linea);
    }
    clear() {
        this.lista = [];
    }
}
exports.salidaXPATH = salidaXPATH;
