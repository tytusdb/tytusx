class UpperLowerCaseFunction implements Expresion{
    private entrada : Expresion;
    private upperCase: boolean;
    linea: number;
    columna: number;

    constructor(entrada: Expresion, upperCase:boolean, linea: number, columna: number) {
        this.entrada = entrada;
        this.upperCase = upperCase;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): Tipo {
        let tipo = this.entrada.getTipo(ent,xmlData);
        if(tipo.esCadena())
            return new Tipo(TipoDato.cadena);
        else
            return new Tipo(TipoDato.err);
    }

    getValor(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let tipo = this.getTipo(ent,xmlData);
        if(tipo.esCadena()){
            let valor = this.entrada.getValor(ent,xmlData);
            if(this.upperCase)
                return valor.toUpperCase();
            else
                return valor.toLowerCase();
        }else{
            ListaErrores.AgregarErrorXQUERY(
                CrearError.errorSemantico("No se pueden usar las funciones de UPPER/LOWER CASE con el tipo de dato "+tipo.toString(),this.linea,this.columna));
        }
        return null;
    }

}