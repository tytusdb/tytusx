class AndLogica implements Expresion{
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

    getTipo(ent: TablaSimbolos): Tipo {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(ent);
        let tipoDerecha = this.derecha.getTipo(ent);
        if(tipoIzquierda.esBoolean() && tipoDerecha.esBoolean()){
            tipo = new Tipo(TipoDato.booleano);
        }
        else if(!tipoIzquierda.esError() && !tipoDerecha.esError()){
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("And(&&)",tipoIzquierda,tipoDerecha,this.linea,this.columna));
        }
        return tipo;
    }

    getValor(ent: TablaSimbolos): any {
        let tipo = this.getTipo(ent);
        let valor;
        if(!tipo.esError()){
            valor = this.izquierdo.getValor(ent) && this.derecha.getValor(ent);
        }
        return valor;

    }

}