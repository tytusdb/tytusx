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
exports.ToNumberXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var Entorno = require("../../../../AST/Entorno");
var ToNumberXQ = /** @class */ (function (_super) {
    __extends(ToNumberXQ, _super);
    function ToNumberXQ(der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'toNumber';
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    ToNumberXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var exD = this.hD.getValor(ent);
        switch (exD.tipo.tipo) {
            case TipoXQ_1.EnumTipo.booleano:
                res.tipo.tipo = TipoXQ_1.EnumTipo.entero;
                if (exD.valor.toString() == 'true') {
                    res.valor = 1;
                }
                else if (exD.valor.toString() == 'false') {
                    res.valor = 0;
                }
                else {
                    console.log('No se puede convertir a entero :v1');
                }
                return res;
            case TipoXQ_1.EnumTipo.cadena:
                var temp = Number(exD.valor.toString());
                if (!isNaN(temp)) {
                    if (this.tieneDot(exD.valor.toString())) {
                        res.tipo.tipo = TipoXQ_1.EnumTipo.doble;
                    }
                    else {
                        res.tipo.tipo = TipoXQ_1.EnumTipo.entero;
                    }
                    res.valor = temp.toString();
                    return res;
                }
                else {
                    console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                }
                return res;
            case TipoXQ_1.EnumTipo.XPath:
                if (Array.isArray(exD.valor)) {
                    //Ya esta operado
                    if (exD.valor.length == 1) {
                        if (exD.valor[0].entorno.hijos.length == 0) {
                            //Convertir
                            var tempXP = Number(exD.valor[0].entorno.texto.toString());
                            if (!isNaN(tempXP)) {
                                if (this.tieneDot(tempXP.toString())) {
                                    res.tipo.tipo = TipoXQ_1.EnumTipo.doble;
                                }
                                else {
                                    res.tipo.tipo = TipoXQ_1.EnumTipo.entero;
                                }
                                res.valor = tempXP.toString();
                                return res;
                            }
                            else {
                                console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                            }
                        }
                        else {
                            //No es nodo hoja
                        }
                    }
                    else {
                        //Hay varios retornos
                    }
                } /* else {
                    let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                    var retXP = exD.valor.Ejecutar(xmlG.valor);
                    if(retXP.length == 1) {
                        if(retXP[0].entorno.hijos.length == 0) {
                            //Convertir
                            let tempXP = Number(retXP[0].entorno.texto.toString());
                            if(!isNaN(tempXP)) {
                                if(this.tieneDot(tempXP.toString())) {
                                    res.tipo.tipo = EnumTipo.doble;
                                } else {
                                    res.tipo.tipo = EnumTipo.entero;
                                }
                                res.valor = tempXP.toString();
                                return res;
                            } else {
                                console.log('Error no se puede convertir \'' + exD.valor.toString() + '\' a Number');
                            }
                        } else {
                            //No es nodo hoja
                        }
                    } else {
                        //Hay varios retornos
                    }
                }*/
                return res;
            default:
                console.log('El tipo de la expresion a convertir no es valido para toNumber()');
                break;
        }
        return res;
    };
    ToNumberXQ.prototype.copiar = function () {
        return new ToNumberXQ(this.hD, this.linea, this.columna);
    };
    ToNumberXQ.prototype.tieneDot = function (entrada) {
        return (entrada.includes('.')) ? true : false;
    };
    return ToNumberXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.ToNumberXQ = ToNumberXQ;
