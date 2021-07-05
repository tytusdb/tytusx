"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llamfuc = void 0;
const _ = require("lodash");
const error_1 = require("../arbol/error");
const errores_1 = require("../arbol/errores");
const entFunc_1 = require("../interfaces/entFunc");
const entorno_1 = require("../interfaces/entorno");
const instruccion_1 = require("../interfaces/instruccion");
const ejeReturn_1 = require("./ejeReturn");
const tipo_1 = require("./tipo");
class llamfuc extends instruccion_1.Instruccion {
    constructor(linea, id, params = null) {
        super(linea);
        Object.assign(this, { id, params });
    }
    ejecutar(e) {
        let entAux = new entorno_1.Entorno();
        let entLocal = new entorno_1.Entorno(e);
        const ejecFunc = _.cloneDeep(e.getFuncion(this.id));
        if (!ejecFunc) {
            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} no existe.` }));
            return;
        }
        else {
            if (this.params) {
                if (!ejecFunc.hasParametros()) {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La funcion ${this.id} no recibe parámetros` }));
                    return;
                }
                else if (this.params.length != ejecFunc.params.length) {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} recibe otra cantidad de parámetros` }));
                    return;
                }
                else {
                    for (let i = 0; i < this.params.length; i++) {
                        const expresion = this.params[i];
                        const variable = ejecFunc.params[i];
                        const valor = expresion.ejecutar(entLocal);
                        if (valor != null && variable.hasTipoAsignado() && variable.tipo != tipo_1.getTipo(valor)) {
                            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El parámetro ${variable.id} de la función ${this.id} no coincide con la llamada` }));
                            return;
                        }
                        variable.valor = valor;
                        entAux.setVariable(variable);
                    }
                }
            }
            else {
                if (ejecFunc.hasParametros()) {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} recibe ${ejecFunc.getParametrosSize()} parámetros` }));
                    return;
                }
            }
            entLocal.variables = entAux.variables;
            entLocal.padre = e.getEntornoGlobal();
            entFunc_1.entFunc.getInstance().iFuncion();
            for (let instruccion of ejecFunc.instrucciones) {
                const resp = instruccion.ejecutar(entLocal);
                //console.log(instruccion, entLocal)
                if (resp instanceof ejeReturn_1.Retorno) {
                    if (ejecFunc.hasReturn() && resp.hasValue()) {
                        let val = resp.getValue();
                        if (typeof val == 'object') {
                            val = val.toString();
                            entFunc_1.entFunc.getInstance().fFuncion();
                            return val;
                        }
                        if (val != null && tipo_1.getTipo(val) != ejecFunc.tipo) {
                            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El retorno de la función ${this.id} no corresponde` }));
                            entFunc_1.entFunc.getInstance().fFuncion();
                            return;
                        }
                        else {
                            entFunc_1.entFunc.getInstance().fFuncion();
                            return val;
                        }
                    }
                    else if (ejecFunc.hasReturn() && !resp.hasValue()) {
                        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} debe retornar un valor` }));
                        entFunc_1.entFunc.getInstance().fFuncion();
                        return;
                    }
                    else if (!ejecFunc.hasReturn() && resp.hasValue()) {
                        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} no debe retornar un valor` }));
                        entFunc_1.entFunc.getInstance().fFuncion();
                        return;
                    }
                    else {
                        entFunc_1.entFunc.getInstance().fFuncion();
                        return;
                    }
                }
            }
            if (ejecFunc.hasReturn()) {
                errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} debe retornar un valor` }));
                entFunc_1.entFunc.getInstance().fFuncion();
                return;
            }
            entFunc_1.entFunc.getInstance().fFuncion();
        }
    }
}
exports.llamfuc = llamfuc;
