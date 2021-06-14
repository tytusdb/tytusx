"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepGramAscXML = void 0;
class RepGramAscXML {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!RepGramAscXML.instance) {
            RepGramAscXML.instance = new RepGramAscXML();
        }
        return RepGramAscXML.instance;
    }
    push(valor) {
        //unshift para agregar un dato al inicio
        //push para agregar un dato al final    
        this.lista.unshift(valor);
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
exports.RepGramAscXML = RepGramAscXML;
