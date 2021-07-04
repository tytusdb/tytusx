class NumberFunction extends ExpresionAncestor{
    private entrada : Expresion;
    linea: number;
    columna: number;

    constructor(entrada: Expresion, linea: number, columna: number) {
        super();
        this.entrada = entrada;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        let tipo = this.entrada.getTipo(ent,xmlData);
        if(tipo.esPrimitivo())
            return new Tipo(TipoDato.numero);
        else
            return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
       let tipo = this.getTipo(ent,xmlData);
       if(tipo.esPrimitivo()){
           let valor = this.entrada.getValor(ent,xmlData);
           let conversion = Number(valor);
           if(!isNaN(conversion)){
               return conversion;
           }else{
               ListaErrores.AgregarErrorXQUERY(
               CrearError.errorSemantico("No se puede convertir en numero el valor "+valor.toString(),this.linea,this.columna));
           }
       }else{
           ListaErrores.AgregarErrorXQUERY(
               CrearError.errorSemantico("No se puede convertir en numero el tipo "+tipo.toString(),this.linea,this.columna));
       }
       return null;
    }
}