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
exports.ToStringXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var Entorno = require("../../../../AST/Entorno");
var ToStringXQ = /** @class */ (function (_super) {
    __extends(ToStringXQ, _super);
    function ToStringXQ(der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'toString()';
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    ToStringXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var exD = this.hD.getValor(ent);
        switch (exD.tipo.tipo) {
            case TipoXQ_1.EnumTipo.entero:
                res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case TipoXQ_1.EnumTipo.doble:
                res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case TipoXQ_1.EnumTipo.booleano:
                res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                res.valor = exD.valor.toString();
                return res;
            case TipoXQ_1.EnumTipo.XPath:
                res.tipo.tipo = TipoXQ_1.EnumTipo.cadena;
                if (Array.isArray(exD.valor)) {
                    //Ya esta operado
                    res.valor = Entorno.conInicial(exD.valor);
                } //else {
                //let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                //var retXP = exD.valor.Ejecutar(xmlG.valor);
                //var st = Entorno.conInicial(retXP);
                //res.valor = st;
                //}
                return res;
            default:
                console.log('El tipo de la expresion a convertir no es valido para toString()');
                break;
        }
        return res;
    };
    ToStringXQ.prototype.copiar = function () {
        return new ToStringXQ(this.hD, this.linea, this.columna);
    };
    return ToStringXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.ToStringXQ = ToStringXQ;
