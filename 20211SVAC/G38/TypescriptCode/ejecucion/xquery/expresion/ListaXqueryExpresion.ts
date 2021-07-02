class ListaXqueryExpresion extends ExpresionAncestor{
    listaExpresiones: any[];
    linea: number;
    columna: number;


    constructor(listaExpresiones: any[], linea: number, columna: number) {
        super();
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {

    }

}