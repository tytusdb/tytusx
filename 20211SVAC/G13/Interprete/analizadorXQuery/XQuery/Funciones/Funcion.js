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
exports.FuncionXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var SimboloXQ_1 = require("../Entorno/SimboloXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var FuncionXQ = /** @class */ (function (_super) {
    __extends(FuncionXQ, _super);
    function FuncionXQ(n, lp, b, l, c) {
        var _this = _super.call(this) || this;
        _this.nombre = n;
        _this.listaP = lp;
        _this.listaI = b;
        _this.linea = l;
        _this.columna = c;
        _this.tipo = new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.tvoid);
        return _this;
    }
    FuncionXQ.prototype.setTipo = function (t) {
        this.tipo = t;
    };
    FuncionXQ.prototype.ejecutar = function (ent) {
        var auxNombre = '$' + this.nombre;
        this.listaP.forEach(function (param) {
            auxNombre += '_' + param.tipo.tipo;
        });
        var sim = new SimboloXQ_1.SimboloXQ(this.tipo, this);
        ent.insertar(auxNombre, sim, this.linea, this.columna, 'La funcion');
        return null;
    };
    return FuncionXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.FuncionXQ = FuncionXQ;
