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
exports.Error = void 0;
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error() {
        return _super.call(this) || this;
    }
    Error.add = function (err) {
        this.prototype.push(err);
    };
    Error.verificarerror = function () {
        if (this.prototype.length > 0) {
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    };
    Error.geterror = function () {
        var cad = "";
        cad += "<table class = \"table\"";
        cad += "<tr>\n";
        cad += "<th scope=\"col\">TIPO DE ERROR</th><th scope=\"col\">DESCRIPCION</th><th scope=\"col\">LINEA</th>";
        cad += "</tr>";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "<tr>\n";
            cad += "<th scope=\"col\">" + this.prototype[i].getToken() + "</th><th scope=\"col\">" +
                this.prototype[i].getdescripcion() + "</th><th scope=\"col\">" +
                this.prototype[i].getFila() + "</th>\n";
            cad += "</tr>\n";
        }
        cad += "</table>\n";

        return cad;
    };
    Error.clear = function () {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    };
    return Error;
}(Array));
exports.Error = Error;
