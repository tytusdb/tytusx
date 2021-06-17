import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
export default class predicate {
    constructor(slc, exp, linea, columna) {
        this.slc = slc;
        this.exp = exp;
        this.linea = linea;
        this.columna = columna;
        this.matches = new Array();
    }
    getTipo(ent, arbol) {
        return tipo.STRUCT;
    }
    getValor(ent, arbol) {
        let entornos;
        entornos = this.slc.getValor(ent, arbol);
        let val = this.exp.getValor(entornos, arbol);
        if (val instanceof Array) {
            if (typeof val[0] === 'number') {
                for (let i of val) {
                    this.matches.push(entornos[i - 1]);
                }
            }
            else if (val[0] instanceof entorno) {
                for (let i of val) {
                    this.matches.push(i);
                }
            }
        }
        else {
            if (typeof val === 'number') {
                this.matches.push(entornos[val - 1]);
            }
            else if (val instanceof entorno) {
                this.matches.push(val);
            }
        }
        return this.matches;
    }
}
//# sourceMappingURL=predicate.js.map