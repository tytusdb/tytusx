"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(descripcion, line = 0, column = 0, type = '') {
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
        this.type = type;
    }
}
exports.Error = Error;
