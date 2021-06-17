export class ast {
    getArbolito(arbol) {
        this.arbolito = "nodo0[label=\"" + arbol.id + "\"];\n";
        this.numeroNodo = 1;
        this.recorrerAst("nodo0", arbol);
        return this.arbolito;
    }
    recorrerAst(padre, raiz) {
        for (let hijo of raiz.hijos) {
            this.nombreHijo = "nodo" + this.numeroNodo.toString();
            this.arbolito += this.nombreHijo + "[label=\"" + hijo.id + "\"];\n";
            this.arbolito += padre + " -> " + this.nombreHijo + ";\n";
            if (hijo.atributos.length > 0) {
                for (let atri of hijo.atributos) {
                    this.numeroNodo++;
                    this.nombreAtributo = "nodo" + this.numeroNodo.toString();
                    this.arbolito += this.nombreAtributo + "[label=\"" + atri.id + "\"];\n";
                    this.arbolito += this.nombreHijo + " -> " + this.nombreAtributo + ";\n";
                }
            }
            this.numeroNodo++;
            this.recorrerAst(this.nombreHijo, hijo);
        }
    }
}
//# sourceMappingURL=ast.js.map