class Simbolo implements Expresion{
    public id: string;
    public valor: any;
    public tipo: Tipo;
    public line: number;
    public column: number;
    
    constructor(id: string, valor:any, tipo:Tipo, line:number, column:number) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.line = line;
        this.column =  column;
    }

    getTipo(e: Entorno):Tipo {
        return this.tipo;
    }

    getValorImplicito(e: Entorno) {
        return this.valor;
    }

    generarGrafo(g:GraphValue, padre:String): any{
        return null;
    };

    getNombreHijo():String {
        return "";
    };

}