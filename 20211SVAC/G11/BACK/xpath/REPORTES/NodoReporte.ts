
export class NodoReporte{
    private bnf:string;
    private precedencia:string;
    private grafo:string;

    constructor(b:string,p:string,gra:string){
        this.bnf=b;
        this.precedencia=p;
        this.grafo=gra;
    }

    public getbnf():any{
        return this.bnf;
    }

    public getpre():any{
        return this.precedencia;
    }

    public getgrafo():any{
        return this.grafo;
    }
}