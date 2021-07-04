class Retorno implements InstruccionXquery{

    expresion: Expresion;
    linea: number;
    columna: number;

    constructor(expresion: Expresion, linea: number, columna: number) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let val = this.expresion.getValor(ent,xmlData);
        if(val == null || val == undefined){
            ListaErrores.AgregarErrorXQUERY(
                CrearError.errorSemantico("Error en la ejecucion de la expresion de retorno",
                                            this.linea,this.columna));
        }else{
            throw new ReturnException(val);
        }
    }

    traducirXQ(sizeScope: string, otro:any) {
        this.expresion.traducirRetorno3DXQuery(sizeScope,otro);
    }

}