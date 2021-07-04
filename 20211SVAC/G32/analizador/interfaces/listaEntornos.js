"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaEntornos = void 0;
const _ = require("lodash");
class ListaEntornos {
    constructor() {
        this.lista = [];
    }
    static getInstance() {
        if (!ListaEntornos.instance) {
            ListaEntornos.instance = new ListaEntornos();
        }
        return ListaEntornos.instance;
    }
    push(entorno) {
        this.lista.push(_.cloneDeep(entorno));
    }
    clear() {
        this.lista = [];
    }
}
exports.ListaEntornos = ListaEntornos;
