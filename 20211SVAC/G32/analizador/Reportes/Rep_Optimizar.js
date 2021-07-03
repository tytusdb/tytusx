"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rep_Optimizar = void 0;
class Rep_Optimizar {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!Rep_Optimizar.instance) {
            Rep_Optimizar.instance = new Rep_Optimizar();
        }
        return Rep_Optimizar.instance;
    }
    push(valor) {
        //unshift para agregar un dato al inicio
        //push para agregar un dato al final    
        this.lista.push(valor);
    }
    clear() {
        this.lista = [];
    }
    hasProd() {
        return this.lista.length > 0;
    }
    getText() {
        return this.lista;
    }
}
exports.Rep_Optimizar = Rep_Optimizar;
