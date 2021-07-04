class FilterResult implements InstruccionXquery{
    variable : string;
    filterExpresion: Expresion;
    linea: number;
    columna: number;

    constructor(variable: string, filterExpresion: Expresion, linea: number, columna: number) {
        this.variable = variable;
        this.filterExpresion = filterExpresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let simbolo = ent.obtenerSimbolo(this.variable);
        if(simbolo == null || !simbolo.tipo.esXpath()){
            ListaErrores.AgregarErrorXQUERY(
                    CrearError.errorSemantico("No se encontro la variable "+this.variable+"en el entorno actual",
                                                this.linea,this.columna)
                    );
            return;
        }

        return PredicateExpresion.filterXpathXqueryExpresion(ent,simbolo.valorXpath,[this.filterExpresion]);
    }

    traducirXQ(sizeScope: string, otro:any) {
        throw new Error("Method not implemented.");
    }

}