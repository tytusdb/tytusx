class XqueryList implements InstruccionXquery{
    xqueryInstruccions: InstruccionXquery[];
    columna: number;
    linea: number;

    constructor(xqueryInstruccions: InstruccionXquery[]) {
        this.xqueryInstruccions = xqueryInstruccions;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        this.xqueryInstruccions.forEach( function (instruccion) {
            try{
                instruccion.ejecutar(ent,xmlData);
            }catch (exception){
                if(exception instanceof ReturnException){
                    InterfazGrafica.print(XpathUtil.convertirXqueryAString(exception.valor));
                }
            }
        });
    }

}