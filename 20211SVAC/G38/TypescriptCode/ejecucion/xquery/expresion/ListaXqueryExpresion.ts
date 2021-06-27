class ListaXqueryExpresion implements Expresion{
    listaExpresiones: any[];
    linea: number;
    columna: number;


    constructor(listaExpresiones: any[], linea: number, columna: number) {
        this.listaExpresiones = listaExpresiones;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        return undefined;
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {

    }

}