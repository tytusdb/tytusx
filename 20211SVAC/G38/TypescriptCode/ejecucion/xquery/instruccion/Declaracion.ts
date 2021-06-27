class Declaracion implements InstruccionXquery{
    variable: string;
    expresion: Expresion;
    linea: number;
    columna: number;

    constructor(variable: string, expresion: Expresion, linea: number, columna: number) {
        this.variable = variable;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: TablaSimbolosXquery, xmlData: TablaSimbolos): any {
        let tipo = this.expresion.getTipo(ent, xmlData);
        let valor;
        if(!tipo.esError()){
            valor = this.expresion.getValor(ent,xmlData);
            this.createSimbolo(valor,  tipo, ent, xmlData);
        }else{
            ListaErrores.AgregarErrorXQUERY(
                CrearError.errorSemantico("No se pudo guardar la variable con nombre "+this.variable
                    +" porque la expresion es invalida",this.linea,this.columna)
            );
        }
    }

    private createSimbolo(valor: any,  tipo:Tipo, ent:TablaSimbolosXquery, xmlData: TablaSimbolos){
        if( valor != null && valor != undefined){
            let simbolo : Simbolo;
            if(valor instanceof Primitive)
                simbolo = new Simbolo(this.variable,tipo,valor.getValor(ent,xmlData),null);
            else if(valor instanceof TablaSimbolos)
                simbolo = new Simbolo(this.variable,tipo,null,valor);
            else
                simbolo = new Simbolo(this.variable,tipo,valor,null);
            if(!ent.agregarSimbolo(simbolo)){
                ListaErrores.AgregarErrorXQUERY(
                    CrearError.errorSemantico("No se pudo guardar la variable con nombre "+this.variable
                        +" porque ya ha sido declarada",this.linea,this.columna)
                );
            }
        }
    }
}