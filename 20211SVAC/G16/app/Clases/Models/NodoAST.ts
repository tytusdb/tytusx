export default class NodoAST {
    public etiqueta: string;
    public hijos: Array<NodoAST>;

    constructor(etiqueta: string) {
        this.etiqueta = etiqueta;
        this.hijos = new Array<NodoAST>();
    }

    public AgregarHijo(nuevo: NodoAST) {
        this.hijos.push(nuevo);
    }

    public getHijos(nodo: NodoAST) {
        raiz = nodo;
    }
}

var raiz: NodoAST;