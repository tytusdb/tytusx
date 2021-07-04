"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If_Else = void 0;
const entorno_1 = require("../interfaces/entorno");
const instruccion_1 = require("../interfaces/instruccion");
class If_Else extends instruccion_1.Instruccion {
    constructor(linea, condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF) {
        super(linea);
        Object.assign(this, { condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF });
    }
    ejecutar(e) {
        if (this.condicionELSEIF) {
            if (this.condicionIF.ejecutar(e)) {
                const entorno = new entorno_1.Entorno(e);
                const resp = this.instruccionIF.ejecutar(entorno);
                //console.log('entra if', this.instruccionIF, resp);
                return resp;
            }
            else if (this.condicionELSEIF.ejecutar(e)) {
                const entorno = new entorno_1.Entorno(e);
                const resp = this.instruccionELSEIF.ejecutar(entorno);
                //console.log('entra elseif', this.instruccionELSEIF, resp);
                return resp;
            }
            else {
                const entorno = new entorno_1.Entorno(e);
                const resp = this.instruccionELSE.ejecutar(entorno);
                //console.log('entra else', this.instruccionELSE, resp);
                return resp;
            }
        }
        if (this.condicionIF.ejecutar(e)) {
            const entorno = new entorno_1.Entorno(e);
            const resp = this.instruccionIF.ejecutar(entorno);
            //console.log('entra if', this.instruccionIF, resp);
            return resp;
        }
        else {
            const entorno = new entorno_1.Entorno(e);
            const resp = this.instruccionELSE.ejecutar(entorno);
            //console.log('entra else', this.instruccionELSE, resp);
            return resp;
        }
    }
}
exports.If_Else = If_Else;
