export default class NodoAST{
    public hijos:Array<any>;
    public valor:string;

    constructor(valor:string){
        this.hijos = new Array();
        this.valor = valor;
    }

    public addHijos(hijos:Array<any>) {
        this.hijos = hijos;
    }

    public addHijo(hijo:NodoAST){
        this.hijos.push(hijo)
    }

    public addHijoSimple(hijo:string){   // Para cuando se requiera solo un valor
        this.hijos.push(new NodoAST(hijo))
    }
    public getValor(): String {
        return this.valor;
    }

    public setValor(cad: string) {
        this.valor = cad;
    }

    public getHijos(): Array<NodoAST> {
        return this.hijos;
    } 
}