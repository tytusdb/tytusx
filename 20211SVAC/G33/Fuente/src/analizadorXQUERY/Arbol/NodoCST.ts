export class NodoCST {
    hijos: Array<NodoCST>;
    valor: String;

    constructor(valor: String) {
        this.hijos = new Array();
        this.valor = valor;
    }

    public setHijos(hijos: Array<NodoCST>): void {
        this.hijos = hijos;
    }

    public agregarHijo(hijo: any): void {
        if (hijo instanceof NodoCST) {
            this.hijos.push(hijo);
        } else {
            this.hijos.push(new NodoCST(<String>hijo));
        }
    }

    public agregarHijos(hijos: Array<NodoCST>): void {
        hijos.forEach(hijo => this.hijos.push(hijo));
    }

    public agregarPrimerHijo(hijo: any): void {
        if (hijo instanceof String) {
            this.hijos.push(new NodoCST(hijo));
        } else if (hijo instanceof NodoCST) {
            this.hijos.push(hijo);
        }
    }

    public getValor(): String {
        return this.valor;
    }

    public setValor(cad: String): void {
        this.valor = cad;
    }

    public getHijos(): Array<NodoCST> {
        return this.hijos;
    }
}