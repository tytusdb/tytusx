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
exports.BloqueXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var BloqueXQ = /** @class */ (function (_super) {
    __extends(BloqueXQ, _super);
    function BloqueXQ() {
        var _this = _super.call(this) || this;
        _this.listabloque = [];
        return _this;
    }
    BloqueXQ.prototype.setDatos = function (lb, l, c) {
        this.listabloque = lb;
        this.linea = l;
        this.columna = c;
    };
    BloqueXQ.prototype.ejecutar = function (ent) {
        var ret = null;
        this.listabloque.forEach(function (nodo) {
            if (nodo instanceof InstruccionXQ_1.InstruccionXQ) {
                var ins = nodo.ejecutar(ent);
                if (ins != null) {
                    ret = ins;
                }
            }
            else {
                console.log('Hacer cosas de expresion si es que hay');
                //nodo.getValor(ent);
            }
        });
        return ret;
    };
    return BloqueXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.BloqueXQ = BloqueXQ;
