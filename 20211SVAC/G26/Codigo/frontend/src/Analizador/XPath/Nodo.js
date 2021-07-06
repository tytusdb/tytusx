export class Nodo {
    constructor(nombre, tipo, linea, columna, predicado, tipoAxis, nodeTest) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.nombre = nombre;
        this.predicado = predicado;
        this.fromRoot = true;
        this.tipoAxis = tipoAxis;
        this.NodeTest = nodeTest;
    }
    get3Dir() {
    }
    ToString() {
        if (this.predicado != undefined) {
            return this.nombre + " " + this.predicado;
        }
        return this.nombre;
    }
    isFromRoot() {
        return this.fromRoot;
    }
    setFromRoot(fromRoot) {
        this.fromRoot = fromRoot;
    }
    getValorInicial() {
        return this.nombre;
    }
    getValor() {
        if (this.NodeTest != undefined) {
            return this.NodeTest.getNombre();
        }
        return this.nombre;
    }
    getNombre() {
        return this.nombre;
    }
    getPredicado() {
        if (this.NodeTest != undefined) {
            return this.NodeTest.getPredicado();
        }
        return this.predicado;
    }
    getTipo() {
        return this.tipo;
    }
    isAxis() {
        if (this.tipoAxis != undefined) {
            return true;
        }
        return false;
    }
    getTipoAxis() {
        return this.tipoAxis;
    }
}
export var TipoNodo;
(function (TipoNodo) {
    TipoNodo[TipoNodo["IDENTIFIER"] = 0] = "IDENTIFIER";
    TipoNodo[TipoNodo["ATRIBUTO"] = 1] = "ATRIBUTO";
    TipoNodo[TipoNodo["DOT"] = 2] = "DOT";
    TipoNodo[TipoNodo["DOTDOT"] = 3] = "DOTDOT";
    TipoNodo[TipoNodo["ASTERISCO"] = 4] = "ASTERISCO";
    TipoNodo[TipoNodo["AXIS"] = 5] = "AXIS";
    TipoNodo[TipoNodo["FUNCION"] = 6] = "FUNCION";
    TipoNodo[TipoNodo["NODOERROR"] = 7] = "NODOERROR";
})(TipoNodo || (TipoNodo = {}));
export var TipoAxis;
(function (TipoAxis) {
    TipoAxis[TipoAxis["ANCESTOR"] = 0] = "ANCESTOR";
    TipoAxis[TipoAxis["ANCESTORORSELF"] = 1] = "ANCESTORORSELF";
    TipoAxis[TipoAxis["ATTRIBUTE"] = 2] = "ATTRIBUTE";
    TipoAxis[TipoAxis["CHILD"] = 3] = "CHILD";
    TipoAxis[TipoAxis["DESCENDANT"] = 4] = "DESCENDANT";
    TipoAxis[TipoAxis["DESCENDANTORSELF"] = 5] = "DESCENDANTORSELF";
    TipoAxis[TipoAxis["FOLLOWING"] = 6] = "FOLLOWING";
    TipoAxis[TipoAxis["FOLLOWINGSIBLING"] = 7] = "FOLLOWINGSIBLING";
    TipoAxis[TipoAxis["PARENT"] = 8] = "PARENT";
    TipoAxis[TipoAxis["PRECEDING"] = 9] = "PRECEDING";
    TipoAxis[TipoAxis["PRECEDINGSIBLING"] = 10] = "PRECEDINGSIBLING";
    TipoAxis[TipoAxis["SELF"] = 11] = "SELF";
    TipoAxis[TipoAxis["NAMESPACE"] = 12] = "NAMESPACE";
})(TipoAxis || (TipoAxis = {}));
