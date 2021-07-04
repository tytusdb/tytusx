"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Primitivo_1 = require("./Primitivo");
const TiposOp_1 = require("./TiposOp");
const TipoVal_1 = require("./TipoVal");
class OpBinaria {
    constructor(opIzq, opDer, tipo) {
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipo = tipo;
    }
    ejecutar() {
        let primitivoIzq = this.opIzq.ejecutar();
        let primitivoDer = this.opDer.ejecutar();
        switch (this.tipo) {
            case TiposOp_1.TiposOp.SUMA:
                if ((primitivoIzq.tipo === TipoVal_1.TipoVal.ENTERO || primitivoIzq.tipo === TipoVal_1.TipoVal.DECIMAL) &&
                    (primitivoDer.tipo === TipoVal_1.TipoVal.ENTERO || primitivoDer.tipo === TipoVal_1.TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor + primitivoDer.valor;
                    let tipo = res % 1 === 0 ? TipoVal_1.TipoVal.ENTERO : TipoVal_1.TipoVal.DECIMAL;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.RESTA:
                if ((primitivoIzq.tipo === TipoVal_1.TipoVal.ENTERO || primitivoIzq.tipo === TipoVal_1.TipoVal.DECIMAL) &&
                    (primitivoDer.tipo === TipoVal_1.TipoVal.ENTERO || primitivoDer.tipo === TipoVal_1.TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor - primitivoDer.valor;
                    let tipo = res % 1 === 0 ? TipoVal_1.TipoVal.ENTERO : TipoVal_1.TipoVal.DECIMAL;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MULTIPLICACION:
                if ((primitivoIzq.tipo === TipoVal_1.TipoVal.ENTERO || primitivoIzq.tipo === TipoVal_1.TipoVal.DECIMAL) &&
                    (primitivoDer.tipo === TipoVal_1.TipoVal.ENTERO || primitivoDer.tipo === TipoVal_1.TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor * primitivoDer.valor;
                    let tipo = res % 1 === 0 ? TipoVal_1.TipoVal.ENTERO : TipoVal_1.TipoVal.DECIMAL;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.DIVISION:
                if ((primitivoIzq.tipo === TipoVal_1.TipoVal.ENTERO || primitivoIzq.tipo === TipoVal_1.TipoVal.DECIMAL) &&
                    (primitivoDer.tipo === TipoVal_1.TipoVal.ENTERO || primitivoDer.tipo === TipoVal_1.TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor / primitivoDer.valor;
                    let tipo = res % 1 === 0 ? TipoVal_1.TipoVal.ENTERO : TipoVal_1.TipoVal.DECIMAL;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MODULO:
                if ((primitivoIzq.tipo === TipoVal_1.TipoVal.ENTERO || primitivoIzq.tipo === TipoVal_1.TipoVal.DECIMAL) &&
                    (primitivoDer.tipo === TipoVal_1.TipoVal.ENTERO || primitivoDer.tipo === TipoVal_1.TipoVal.DECIMAL)) {
                    let res = primitivoIzq.valor % primitivoDer.valor;
                    let tipo = res % 1 === 0 ? TipoVal_1.TipoVal.ENTERO : TipoVal_1.TipoVal.DECIMAL;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.AND:
                if (primitivoIzq.tipo === TipoVal_1.TipoVal.BOLEANO && primitivoDer.tipo === TipoVal_1.TipoVal.BOLEANO) {
                    let res = primitivoIzq.valor && primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.OR:
                if (primitivoIzq.tipo === TipoVal_1.TipoVal.BOLEANO && primitivoDer.tipo === TipoVal_1.TipoVal.BOLEANO) {
                    let res = primitivoIzq.valor || primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MAYOR_QUE:
                if (primitivoIzq.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA] &&
                    primitivoDer.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA]) {
                    let res = primitivoIzq.valor > primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MENOR_QUE:
                if (primitivoIzq.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA] &&
                    primitivoDer.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA]) {
                    let res = primitivoIzq.valor < primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MAYOR_IGUAL:
                if (primitivoIzq.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA] &&
                    primitivoDer.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA]) {
                    let res = primitivoIzq.valor >= primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.MENOR_IGUAL:
                if (primitivoIzq.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA] &&
                    primitivoDer.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA]) {
                    let res = primitivoIzq.valor <= primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
            case TiposOp_1.TiposOp.NO_IGUAL:
                if (primitivoIzq.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA] &&
                    primitivoDer.tipo in [TipoVal_1.TipoVal.ENTERO, TipoVal_1.TipoVal.DECIMAL, TipoVal_1.TipoVal.BOLEANO, TipoVal_1.TipoVal.CADENA]) {
                    let res = primitivoIzq.valor != primitivoDer.valor;
                    let tipo = TipoVal_1.TipoVal.BOLEANO;
                    return new Primitivo_1.Primitivo(res, tipo);
                }
        }
    }
}
exports.OpBinaria = OpBinaria;
