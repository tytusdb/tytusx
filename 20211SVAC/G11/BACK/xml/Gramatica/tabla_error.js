"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class errores extends Array {
    constructor() {
        super();
    }
    static addError(err) {
        this.prototype.push(err);
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
    static getErrores() {
        var aux = new Array;
        this.prototype.forEach(er => {
            aux.push(er);
        });
        return aux;
    }
}
exports.errores = errores;