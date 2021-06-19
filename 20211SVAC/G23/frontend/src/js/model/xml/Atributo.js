"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
var Atributo = /** @class */ (function () {
    function Atributo(id, value, line, column) {
        this.id = id;
        this.value = value;
        this.line = line;
        this.column = column;
    }
    Object.defineProperty(Atributo.prototype, "Cst", {
        get: function () {
            return this.cst;
        },
        set: function (value) {
            this.cst = value;
        },
        enumerable: false,
        configurable: true
    });
    return Atributo;
}());
exports.Atributo = Atributo;
