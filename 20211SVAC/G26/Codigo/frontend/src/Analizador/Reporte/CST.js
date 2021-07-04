"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cstXpathDesc = exports.cstXpathAsc = exports.cstXmlDesc = exports.cstXmlAsc = void 0;
class CST {
    constructor() {
        this.id = 0;
        this.pila = [];
        this.raiz = null;
    }
    agregarPila(nodo) {
        this.pila.push(nodo);
    }
    obtenerUltimoNodo() {
        return this.pila.pop();
    }
    setRaiz(root) {
        this.raiz = root;
    }
    getRaiz() {
        return this.raiz;
    }
    getId() {
        this.id = this.id + 1;
        return this.id;
    }
}
const cstXmlAsc = new CST();
exports.cstXmlAsc = cstXmlAsc;
const cstXmlDesc = new CST();
exports.cstXmlDesc = cstXmlDesc;
const cstXpathAsc = new CST();
exports.cstXpathAsc = cstXpathAsc;
const cstXpathDesc = new CST();
exports.cstXpathDesc = cstXpathDesc;
