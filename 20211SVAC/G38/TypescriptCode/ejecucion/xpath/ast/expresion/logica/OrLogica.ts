class OrLogica implements Expresion{
    private izquierdo: Expresion;
    private derecha: Expresion;
    linea: number;
    columna: number;

    constructor(izquierdo: Expresion, derecha: Expresion, linea: number, columna: number) {
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(tsXquery,ent);
        let tipoDerecha = this.derecha.getTipo(tsXquery,ent);
        if(tipoIzquierda.esBoolean() && tipoDerecha.esBoolean()){
            tipo = new Tipo(TipoDato.booleano);
        }
        else if(!tipoIzquierda.esError() && !tipoDerecha.esError()){
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("Or(||)",tipoIzquierda,tipoDerecha,this.linea,this.columna));
        }
        return tipo;
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
        let tipo = this.getTipo(tsXquery,ent);
        let valor;
        if(!tipo.esError()){
            valor = this.izquierdo.getValor(tsXquery,ent) || this.derecha.getValor(tsXquery,ent);
        }
        return valor;

    }

}