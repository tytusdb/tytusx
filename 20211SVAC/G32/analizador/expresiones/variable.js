"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
const xmlTS_1 = require("../arbol/xmlTS");
class Variable {
    constructor({ id, tipo = null, valor = null, dimensiones = 0 }) {
        Object.assign(this, { id, tipo, valor, dimensiones });
    }
    hasTipoAsignado() {
        return this.tipo != null;
    }
    getValor() {
        return this.valor;
    }
    toString(ent) {
        let ts = new xmlTS_1.XmlTS();
        let valorr = this.valor;
        if (typeof this.valor == 'object') {
            valorr = valorr.toString();
            //this.tipo = 6;
        }
        ts.agregar(this.id, valorr, ent.toString(), this.tipo.toString(), 1, 1, null, null);
        return ts;
    }
}
exports.Variable = Variable;
