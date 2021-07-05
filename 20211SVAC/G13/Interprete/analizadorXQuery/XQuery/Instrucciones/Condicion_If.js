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
exports.Condicion_If = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var Entorno_1 = require("../Entorno/Entorno");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var Condicion_If = /** @class */ (function (_super) {
    __extends(Condicion_If, _super);
    function Condicion_If(con, b, l, c) {
        var _this = _super.call(this) || this;
        _this.ejecutado = false;
        _this.condicion = con;
        _this.bloque_ins = b;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Condicion_If.prototype.ejecutar = function (ent) {
        this.ejecutado = false;
        var ex = this.condicion.getValor(ent);
        if (ex.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
            var res = (ex.valor.toString() == 'true');
            if (res == true) {
                //console.log('Es TRUE');
                var ret = this.bloque_ins.ejecutar(new Entorno_1.EntornoXQ(ent));
                this.ejecutado = true;
                if (ret != null) {
                    return ret;
                }
            }
            else {
                //console.log('Es FALSEs');
            }
        }
        else {
            // Error condicion del if no es booleano
            console.log('Condicion del if no es booleano');
        }
        return null;
    };
    return Condicion_If;
}(InstruccionXQ_1.InstruccionXQ));
exports.Condicion_If = Condicion_If;
