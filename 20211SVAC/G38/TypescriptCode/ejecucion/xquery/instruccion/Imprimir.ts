class Imprimir implements NodoXquery, InstruccionXquery{

    expresion: Expresion;
    columna: number;
    linea: number;

    constructor(expresion: Expresion, columna: number, linea: number) {
        this.expresion = expresion;
        this.columna = columna;
        this.linea = linea;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let valor = this.expresion.getValor(ent,xmlData);
        InterfazGrafica.print(valor);
    }

}