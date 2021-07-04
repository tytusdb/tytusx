"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const xmlTS_1 = require("../arbol/xmlTS");
class Funcion {
    constructor(id, instrucciones, tipo = 4 /* VOID */, params = null) {
        Object.assign(this, { id, instrucciones, tipo, params });
    }
    hasReturn() {
        return this.tipo != 4 /* VOID */;
    }
    hasParametros() {
        return this.params != null;
    }
    getParametrosSize() {
        return this.hasParametros() ? this.params.length : 0;
    }
    toString(ent) {
        let ts = new xmlTS_1.XmlTS();
        const parametros = this.params != null ? this.params.length : 0;
        let salida = `Funcion: ${this.id} - Parametros: ${parametros} - Return Asignado: ${this.hasReturn() ? 'Si' : 'No'}`;
        console.log(salida);
        ts.agregar(this.id, '0', ent.toString(), this.tipo.toString(), 1, 1, null, null);
        return ts;
    }
}
exports.Funcion = Funcion;
