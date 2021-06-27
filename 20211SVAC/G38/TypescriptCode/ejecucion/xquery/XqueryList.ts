class XqueryList implements InstruccionXquery{
    xqueryInstruccions: InstruccionXquery[];
    columna: number;
    linea: number;

    constructor(xqueryInstruccions: InstruccionXquery[]) {
        this.xqueryInstruccions = xqueryInstruccions;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let salidas : any[] = [];
        this.xqueryInstruccions.forEach( function (instruccion) {
            if(instruccion instanceof  Imprimir){
                let salida = instruccion.ejecutar(ent,xmlData);
                if(salida != null && salida != undefined) salidas.push(salida);
            }else{
                instruccion.ejecutar(ent,xmlData);
            }
        });
        return salidas;
    }

}