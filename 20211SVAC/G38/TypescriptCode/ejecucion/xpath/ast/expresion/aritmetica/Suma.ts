class Suma implements Expresion{
    private izquierda: Expresion;
    private derecha: Expresion;
    columna: number;
    linea: number;

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
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("Suma",tipoIzquierda,tipoDerecha,this.linea,this.columna));
        }
        return tipo;
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let tipo = this.getTipo(tsXquery,ent);
        let valor;
        if(!tipo.esError()){
            valor = this.izquierda.getValor(tsXquery,ent) + this.derecha.getValor(tsXquery,ent);
        }
        return valor;

    }


}