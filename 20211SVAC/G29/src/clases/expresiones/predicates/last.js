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
            this.val = ent.length;
            return ent.length;
        }
        else {
            this.val = 1;
            return 1;
        }
    }
    traducir(ent, c3d) {
        let t = { "id": c3d.generateTemp(), "val": this.val };
        c3d.temp[t.id] = t.val;
        c3d.main += `\tt${t.id} = ${t.val};\n`;
        return t.id;
    }
}
//# sourceMappingURL=last.js.map