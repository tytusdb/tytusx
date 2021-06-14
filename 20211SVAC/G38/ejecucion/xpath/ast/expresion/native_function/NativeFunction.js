"use strict";
var NativeFunction;
(function (NativeFunction) {
    NativeFunction[NativeFunction["last"] = 0] = "last";
    NativeFunction[NativeFunction["position"] = 1] = "position";
    NativeFunction[NativeFunction["text"] = 2] = "text";
})(NativeFunction || (NativeFunction = {}));
class NativeFunctionExpresion {
    constructor(nativeFunction, linea, columna) {
        this.nativeFunction = nativeFunction;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
    }
}
