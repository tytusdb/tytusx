import { tipo } from "src/clases/ast/tipo";
export default class position {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, arbol) {
        return tipo.INT;
    }
    getValor(ent, arbol) {
        if (ent instanceof Array) {
            this.val = ent.length;
            return [ent.length];
        }
        else {
            this.val = 1;
            return [1];
        }
    }
    traducir(ent, c3d) {
        //
    }
}
//# sourceMappingURL=position.js.map