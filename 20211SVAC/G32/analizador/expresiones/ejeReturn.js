"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorno = void 0;
class Retorno {
    constructor(has_value, value) {
        Object.assign(this, { has_value, value });
    }
    hasValue() {
        return this.has_value;
    }
    getValue() {
        return this.value;
    }
}
exports.Retorno = Retorno;
