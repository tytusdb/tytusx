"use strict";
class ReturnException extends Error {
    constructor(valor) {
        super("msg");
        this.valor = valor;
        Object.setPrototypeOf(this, ReturnException.prototype);
    }
}
