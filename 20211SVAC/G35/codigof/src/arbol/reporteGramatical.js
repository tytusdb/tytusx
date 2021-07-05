"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteGramatical = void 0;
class ReporteGramatical {
    constructor() {
        this.lista = [];
        this.lista2 = [];
        this.lista3 = [];
    }
    static getInstance() {
        if (!ReporteGramatical.instance) {
            ReporteGramatical.instance = new ReporteGramatical();
        }
        return ReporteGramatical.instance;
    }
    push(regla) {
        this.lista.unshift(regla);
    }
    push2(regla) {
        this.lista2.unshift(regla);
    }
    push3(regla) {
        this.lista3.unshift(regla);
    }
    clear() {
        this.lista = [];
        this.lista2 = [];
        this.lista3 = [];
    }
    hasRules() {
        return this.lista.length > 0;
    }
    hasRules2() {
        return this.lista2.length > 0;
    }
    hasRules3() {
        return this.lista3.length > 0;
    }
    getRules() {
        return this.lista;
    }
    getRules2() {
        return this.lista2;
    }
    getRules3() {
        return this.lista3;
    }
}
exports.ReporteGramatical = ReporteGramatical;
