"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identificador = void 0;
const error_1 = require("../arbol/error");
const errores_1 = require("../arbol/errores");
const instruccion_1 = require("../interfaces/instruccion");
class identificador extends instruccion_1.Instruccion {
    constructor(linea, id) {
        super(linea);
        Object.assign(this, { id, linea });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        //console.log('identif\n',this.id,variable, e)
        if (variable) {
            return variable.getValor();
        }
        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Sémantico', linea: this.linea, descripcion: `No se encontró la variable ${this.id}` }));
        return null;
    }
}
exports.identificador = identificador;
