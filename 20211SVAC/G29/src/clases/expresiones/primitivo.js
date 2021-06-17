import { tipo } from "../ast/tipo";
export default class primitivo {
    constructor(primitivo, linea, columna) {
        this.primitivo = primitivo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, arbol) {
        let valor = this.getValor(ent, arbol);
        if (typeof valor === 'number') {
            if (valor % 1 == 0) {
                return tipo.INT;
            }
            return tipo.DOUBLE;
        }
        else if (typeof valor === 'string') {
            return tipo.STRING;
        }
        else if (typeof valor === 'boolean') {
            return tipo.BOOL;
        }
        return null;
    }
    getValor(ent, arbol) {
        return this.primitivo;
    }
}
//# sourceMappingURL=primitivo.js.map