"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(padre) {
        this.padre = padre != null ? padre : null;
        this.variables = new Map();
        this.funciones = new Map();
    }
    setVariable(variable) {
        this.variables.set(variable.id, variable);
    }
    getVariable(id) {
        for (let e = this; e != null; e = e.padre) {
            let variable = e.variables.get(id);
            //console.log('entoronosssss\n', id, e);
            if (variable != null)
                return variable;
        }
        return null;
    }
    setFuncion(funcion) {
        this.funciones.set(funcion.id, funcion);
    }
    getFuncion(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return e.funciones.get(id);
            }
        }
        return null;
    }
    getEntornoGlobal() {
        for (let e = this; e != null; e = e.padre) {
            if (e.padre == null)
                return e;
        }
    }
}
exports.Entorno = Entorno;
