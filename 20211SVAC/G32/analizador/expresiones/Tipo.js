"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTipo = void 0;
function getTipo(valor) {
    if (typeof valor == 'string') {
        return 0 /* STRING */;
    }
    else if (typeof valor == 'number') {
        return 1 /* INT */;
    }
    else if (typeof valor == 'boolean') {
        return 3 /* BOOL */;
    }
    else if (typeof valor == 'object') {
        return 6 /* ARRAY */;
    }
    else if (valor == null) {
        return null;
    }
    return null;
}
exports.getTipo = getTipo;
