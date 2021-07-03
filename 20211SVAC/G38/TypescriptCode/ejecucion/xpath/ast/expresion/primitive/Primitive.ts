class Primitive implements Expresion{
    private valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;


    constructor(valor: any, tipo: Tipo, linea: number, columna: number) {
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return this.tipo;
    }

    getValor(ent: TablaSimbolos): any {
        return this.valor;
    }

}