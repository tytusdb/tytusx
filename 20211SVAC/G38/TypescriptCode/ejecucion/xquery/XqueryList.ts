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

    obtenerTS(xmlData: TablaSimbolos):TablaSimbolosXquery{
        let ts = new TablaSimbolosXquery(null,"GLOBAL");
        this.xqueryInstruccions.forEach( function (instruccion) {
            try{
                if(instruccion instanceof Declaracion){
                    instruccion.ejecutar(ts,xmlData);
                }
            }catch (exception){
                if(exception instanceof ReturnException){
                    InterfazGrafica.print(XpathUtil.convertirXqueryAString(exception.valor));
                }
            }
        });
        return ts;
    }

    traducirXQ(sizeScope: string, otro:any) {
        if(this.xqueryInstruccions == null || this.xqueryInstruccions.length == 0){
            return;
        }
        for(let instruction of this.xqueryInstruccions){
            try {
                instruction.traducirXQ(sizeScope,null)
            }catch (tokenError){
                if(tokenError instanceof TokenError){
                    ListaErrores.AgregarErrorC3D(tokenError);
                }
            }
        }

    }

}