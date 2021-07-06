"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
class Primitivo {
    constructor(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    getTipo(arbol) {
        const valor = this.getValorImplicito(arbol);
        if (typeof (valor) === 'boolean') {
            return 3 /* BOOL */;
        }
        else if (typeof (valor) === 'string') {
            return 0 /* STRING */;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return 1 /* INT */;
            }
            return 2 /* DOUBLE */;
        }
        else if (valor === null) {
            return 5 /* NULL */;
        }
        return 4 /* VOID */;
    }
    getValorImplicito(arbol) {
        return this.valor;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    ejecutar(e) {
        return this.valor;
    }
}
exports.Primitivo = Primitivo;
