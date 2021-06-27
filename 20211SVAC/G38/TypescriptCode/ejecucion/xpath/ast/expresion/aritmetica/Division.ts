class Division implements Expresion{
    private izquierda: Expresion;
    private derecha: Expresion;
    linea: number;
    columna: number;

    constructor(izquierda: Expresion, derecha: Expresion,linea:number, columna:number) {
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierda.getTipo(tsXquery,ent);
        let tipoDerecha = this.derecha.getTipo(tsXquery,ent);
        if(tipoIzquierda.esNumero() && tipoDerecha.esNumero()){
            tipo = new Tipo(TipoDato.numero);
        }
        else if(!tipoIzquierda.esError() && !tipoDerecha.esError()){
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("División",tipoIzquierda,tipoDerecha,this.linea,this.columna));
        }
        return tipo;
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let tipo = this.getTipo(tsXquery,ent);
        let valor;
        if(!tipo.esError()){
            let valorDerecha = this.derecha.getValor(tsXquery,ent);
            if(valorDerecha == 0 || valorDerecha == "0"){
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("División dentro de cero",this.linea,this.columna));
                tipo = new Tipo(TipoDato.err);
            }else{
                valor = this.izquierda.getValor(tsXquery,ent) / this.derecha.getValor(tsXquery,ent);
            }
        }
        return valor;

    }


}