"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entFunc = void 0;
class entFunc {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!entFunc.instance) {
            entFunc.instance = new entFunc();
        }
        return entFunc.instance;
    }
    ejecFuncion() {
        return this.lista.length > 0;
    }
    iFuncion() {
        this.lista.push(true);
    }
    fFuncion() {
        this.lista.pop();
    }
}
exports.entFunc = entFunc;
