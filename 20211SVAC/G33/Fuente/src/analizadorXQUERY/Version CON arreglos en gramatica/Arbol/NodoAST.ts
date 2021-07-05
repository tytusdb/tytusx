//import LinkedList from 'ts-linked-list';

export class NodoAST {
    hijos: Array<NodoAST>;
    valor: String;

    constructor(valor: String) {
        this.hijos = new Array();
        this.valor = valor;
    }


    public setHijos(hijos: Array<NodoAST>): void {
        this.hijos = hijos;
    }

    public agregarHijo(hijo: any): void {
        if (hijo instanceof NodoAST) {
            this.hijos.push(hijo);
        } else {
            this.hijos.push(new NodoAST(<String>hijo));
        }
    }

    public agregarHijos(hijos: Array<NodoAST>): void {
        hijos.forEach(hijo => this.hijos.push(hijo));
    }

    public agregarPrimerHijo(hijo: any): void {
        if (hijo instanceof String) {
            this.hijos.push(new NodoAST(hijo));
        } else if (hijo instanceof NodoAST) {
            this.hijos.push(hijo);
        }
    }

    public getValor(): String {
        return this.valor;
    }

    public setValor(cad: String): void {
        this.valor = cad;
    }

    public getHijos(): Array<NodoAST> {
        return this.hijos;
    }
}