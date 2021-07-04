"use strict";
exports.__esModule = true;
exports.AST = void 0;
var Entorno_1 = require("./Entorno");
var AST = /** @class */ (function () {
    function AST(instrucciones, entornos) {
        this.entornos = [];
        this.instrucciones = instrucciones;
        this.entornos.push(entornos);
    }
    AST.prototype.CrearEntorno = function (id, anterior) {
        var exist_ent = false;
        for (var _i = 0, _a = this.entornos; _i < _a.length; _i++) {
            var ent = _a[_i];
            if (ent.getIdentificador() == id) {
                exist_ent = true;
            }
        }
        if (!exist_ent) {
            var entorno_nuevo = new Entorno_1.Entorno(id, anterior);
            this.entornos.push(entorno_nuevo);
        }
    };
    AST.prototype.getEntorno = function (id) {
        for (var _i = 0, _a = this.entornos; _i < _a.length; _i++) {
            var ent = _a[_i];
            if (ent.getIdentificador() == id) {
                return ent;
            }
        }
        return null;
    };
    return AST;
}());
exports.AST = AST;
