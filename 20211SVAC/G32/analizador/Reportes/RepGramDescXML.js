"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepGramDescXML = void 0;
//La clase a exportar para el reporte gramatical ascendente del XML
class RepGramDescXML {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!RepGramDescXML.instance) {
            RepGramDescXML.instance = new RepGramDescXML();
        }
        return RepGramDescXML.instance;
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
exports.RepGramDescXML = RepGramDescXML;
