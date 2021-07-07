"use strict";
exports.__esModule = true;
exports.AST = void 0;
var AST = /** @class */ (function () {
    function AST(instrucciones) {
        this.instrucciones = instrucciones;
        this.etiquetas = new Array();
        this.etiquetasBetadas = new Array();
    }
    AST.prototype.AST = function (instrucciones) {
        this.instrucciones = instrucciones;
        this.etiquetas = new Array();
        this.etiquetasBetadas = new Array();
    };
    AST.prototype.existeEtiqueta = function (id) {
        this.etiquetas.forEach(function (Element) {
            //let comparacion = Element.id.Equals(id);
            if (Element.id == id)
                return true;
        });
        return false;
    };
    AST.prototype.agregarEtiqueta = function (etiqueta) {
        this.etiquetas.push(etiqueta);
    };
    AST.prototype.obtenerEtiqueta = function (texto) {
        this.etiquetas.forEach(function (Element) {
            if (Element.id == texto)
                return Element;
        });
        return null;
    };
    AST.prototype.obtenerSiguienteEtiqueta = function (texto) {
        var _this = this;
        var contador = 0;
        this.etiquetas.forEach(function (Element) {
            if (Element.id == texto) {
                if (_this.etiquetas.length > contador + 1)
                    return _this.etiquetas[contador + 1];
            }
        });
        return null;
    };
    return AST;
}());
exports.AST = AST;
