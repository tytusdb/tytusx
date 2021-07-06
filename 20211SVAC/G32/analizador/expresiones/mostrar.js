"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mostrar = void 0;
const _ = require("lodash");
const instruccion_1 = require("../interfaces/instruccion");
const ejeArreglo_1 = require("./ejeArreglo");
const ejeReturn_1 = require("./ejeReturn");
const if_else_1 = require("./if_else");
class Mostrar extends instruccion_1.Instruccion {
    constructor(linea, impresion) {
        super(linea);
        Object.assign(this, { impresion });
    }
    ejecutar(e) {
        if (!this.impresion) {
            return null;
        }
        let res;
        if (this.impresion[0] instanceof if_else_1.If_Else) {
            res = this.impresion[0].ejecutar(e);
        }
        else
            res = this.impresion.ejecutar(e);
        res = _.cloneDeep(res);
        if (res instanceof ejeArreglo_1.Arreglo) {
            res = res.toString();
        }
        if (res instanceof ejeReturn_1.Retorno) {
            res = res.value;
        }
        const salida = res !== null && res !== void 0 ? res : 'null';
        return salida;
    }
}
exports.Mostrar = Mostrar;
