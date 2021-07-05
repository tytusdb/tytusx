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
    traducir(ent, c3d) {
        let t = { "id": c3d.generateTemp(), "val": this.primitivo };
        c3d.temp[t.id] = t.val;
        c3d.main += `\tt${t.id} = ${t.val};\n`;
        return t.id;
    }
}
//# sourceMappingURL=primitivo.js.map