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
exports.Listita = void 0;
var Listita = /** @class */ (function (_super) {
    __extends(Listita, _super);
    function Listita() {
        return _super.call(this) || this;
    }
    Listita.add = function (nodo) {
        this.prototype.push(nodo);
    };
    Listita.getLista = function () {
        return this.prototype;
    };
    Listita.clear = function () {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    };
    return Listita;
}(Array));
exports.Listita = Listita;
