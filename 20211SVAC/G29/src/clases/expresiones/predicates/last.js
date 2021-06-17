import { tipo } from "src/clases/ast/tipo";
export default class last {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, arbol) {
        return tipo.INT;
    }
    getValor(ent, arbol) {
        if (ent instanceof Array) {
            return ent.length;
        }
        else {
            return 1;
        }
    }
}
//# sourceMappingURL=last.js.map