import ASTNodo from "../../reports/ASTNodo";
export default class atr_xml {
    constructor(id, valor, linea, columna) {
        this.id = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    nuevo(produccion, token, regla) {
        this.cst = new ASTNodo(produccion, token, regla);
    }
}
//# sourceMappingURL=atr_xml.js.map