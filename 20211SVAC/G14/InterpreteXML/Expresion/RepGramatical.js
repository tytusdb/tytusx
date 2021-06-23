"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RepGramatical = /** @class */ (function () {
    function RepGramatical(symbol1, symbol2) {
        this.NoTerminal = symbol1;
        this.Produccion = symbol2;
    }
    Object.defineProperty(RepGramatical.prototype, "rule", {
        get: function () {
            return "<" + this.NoTerminal + ">  ::=  " + this.format() + "\n";
        },
        enumerable: false,
        configurable: true
    });
    RepGramatical.prototype.format = function () {
        var result = this.Produccion.split(" ");
        var result2 = result.map(function (item) { return (item.includes("\'") || item.includes("\"")) ? item : "<" + item + ">"; });
        return result2.join(" ");
    };
    return RepGramatical;
}());
exports.default = RepGramatical;
