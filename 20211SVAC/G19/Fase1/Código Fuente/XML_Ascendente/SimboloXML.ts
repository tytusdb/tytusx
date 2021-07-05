

class SimboloXML  {
    public id: string;
    public valor: any;
    private tipo: any;
    linea: number;
    columna: number;
    Entorno: string;

    constructor(tipo:any, id:string, linea:number, columna:number, valor:any,Entorno: string){
        this.id= id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor=valor;
        this.Entorno=Entorno;

    }

    getTipo(ent: any, arbol: any): any{
        return this.tipo;
    }
    getValorImplicito(ent: any, arbol: any) {
        return this.valor;
    }
    
}
