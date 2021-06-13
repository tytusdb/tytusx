"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoding = void 0;
const Tipo_1 = require("../ast/Tipo");
class Encoding {
    constructor(encoding, line, column) {
        this.encoding = encoding;
        this.line = line;
        this.column = column;
    }
    getTipo(e) {
        return Tipo_1.Tipo.ENCODING;
    }
    ;
    getValorImplicito(e) {
        return this;
    }
    ;
    generarGrafo(g, padre) {
        return null;
    }
    ;
    getNombreHijo() {
        return "ENCODING";
    }
    ;
}
exports.Encoding = Encoding;
