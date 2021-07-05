"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevaFuncion = void 0;
const error_1 = require("../arbol/error");
const errores_1 = require("../arbol/errores");
const funcion_1 = require("./funcion");
const instruccion_1 = require("../interfaces/instruccion");
class nuevaFuncion extends instruccion_1.Instruccion {
    constructor(linea, id, instrucciones, tipo = 4 /* VOID */, params = null) {
        super(linea);
        Object.assign(this, { id, instrucciones, tipo, params });
    }
    ejecutar(e) {
        const funcion = e.getFuncion(this.id);
        if (funcion) {
            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} ya existe` }));
            return;
        }
        else if (this.params) {
            const items = [];
            for (let variable of this.params) {
                if (items.includes(variable.id)) {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El parámetro ${variable.id} de la función ${this.id} está repetido` }));
                    return;
                }
                items.push(variable.id);
            }
        }
        e.setFuncion(new funcion_1.Funcion(this.id, this.instrucciones, this.tipo, this.params));
    }
}
exports.nuevaFuncion = nuevaFuncion;
