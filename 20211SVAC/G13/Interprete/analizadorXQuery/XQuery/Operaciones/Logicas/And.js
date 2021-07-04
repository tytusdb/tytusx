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
exports.AndXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var AndXQ = /** @class */ (function (_super) {
    __extends(AndXQ, _super);
    function AndXQ(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'and';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    AndXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var exI = this.hI.getValor(ent);
        var exD = this.hD.getValor(ent);
        if (exI.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
            if ((exI.valor.toString()) == 'false') {
                //Automaticamente devolver false
                res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                res.valor = (false).toString();
            }
            else if (exD.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
                //Evaluar la operacion
                res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                res.valor = (exI.valor.toString() == 'true') && (exD.valor.toString() == 'true');
            }
            else {
                console.log('Error con la operacion AND. HD no es de tipo booleano');
            }
        }
        else {
            console.log('Error con la operacion AND. HI no es de tipo booleano');
        }
        return res;
    };
    AndXQ.prototype.copiar = function () {
        return new AndXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    };
    return AndXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.AndXQ = AndXQ;
