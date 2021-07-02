class Primitive extends ExpresionAncestor{
    private valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;


    constructor(valor: any, tipo: Tipo, linea: number, columna: number) {
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return this.tipo;
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        return this.valor;
    }

}