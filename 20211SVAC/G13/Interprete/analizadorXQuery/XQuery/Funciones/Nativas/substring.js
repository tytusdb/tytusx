"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.subStringXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var subStringXQ = /** @class */ (function (_super) {
    __extends(subStringXQ, _super);
    function subStringXQ(st, start, cantidad, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'substring()';
        _this.h = st;
        _this.inicio = start;
        _this.len = cantidad;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    subStringXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var arg = this.h.getValor(ent);
        var init = this.inicio.getValor(ent);
        if (arg.tipo.tipo == TipoXQ_1.EnumTipo.cadena) {
            if (init.tipo.tipo == TipoXQ_1.EnumTipo.entero || init.tipo.tipo == TipoXQ_1.EnumTipo.doble) {
                var inicial = parseInt(init.valor.toString());
                if (inicial >= 1) {
                    if (this.len != null) {
                        var fin = this.len.getValor(ent);
                        if (fin.tipo.tipo == TipoXQ_1.EnumTipo.entero || fin.tipo.tipo == TipoXQ_1.EnumTipo.doble) {
                            var pFinal = parseInt(fin.valor.toString());
                            if (pFinal <= arg.valor.toString().length) {
                                res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                                res.valor = (arg.valor.toString()).substring(inicial - 1, pFinal);
                                return res;
                            }
                            else {
                                console.log('La posicion final proporcionado es mayor al tamaño del string');
                            }
                        }
                        else {
                            console.log('La posicion final proporcionada no es de tipo entero');
                        }
                    }
                    else {
                        res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                        res.valor = (arg.valor.toString()).substring(inicial - 1);
                        return res;
                    }
                }
                else {
                    console.log('La posicion inicial proporcionado es menor a la posicion del primer digito');
                }
            }
            else {
                console.log('La posicion inicial proporcionado no es de tipo entero');
            }
        }
        else {
            console.log('El argumento proporcionado no es de tipo cadena');
        }
        return res;
    };
    subStringXQ.prototype.copiar = function () {
        return new subStringXQ(this.h, this.inicio, this.len, this.linea, this.columna);
    };
    return subStringXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.subStringXQ = subStringXQ;
