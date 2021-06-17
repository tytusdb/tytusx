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
exports.Id = void 0;
var Expresion_1 = require("./Expresion");
var Id = /** @class */ (function (_super) {
    __extends(Id, _super);
    function Id(t, iden) {
        var _this = _super.call(this) || this;
        _this.id = iden;
        _this.tipo = t;
        return _this;
    }
    Id.prototype.getValor = function (entorno) {
        //Buscar en el entorno (Objeto XML) lo que deba de ser
        throw new Error("Method not implemented.");
    };
    Id.prototype.copiarValor = function () {
        return new Id(this.tipo, this.id);
    };
    return Id;
}(Expresion_1.Expresion));
exports.Id = Id;
