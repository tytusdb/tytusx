import ASTNodo from "../../reports/ASTNodo";
export default class nodo_xml {
    constructor(id, atributos, valor, hijos, linea, columna, id2) {
        this.id = id;
        this.atributos = atributos;
        this.valor = valor;
        this.hijos = hijos;
        this.linea = linea;
        this.columna = columna;
        this.id2 = id2;
    }
    nuevo(produccion, token, regla) {
        this.cst = new ASTNodo(produccion, token, regla);
    }
    printNode(str) {
        console.log(str + this.id);
        for (let hijo of this.hijos) {
            hijo.printNode(str + "\t");
        }
    }
}
//# sourceMappingURL=nodo_xml.js.map