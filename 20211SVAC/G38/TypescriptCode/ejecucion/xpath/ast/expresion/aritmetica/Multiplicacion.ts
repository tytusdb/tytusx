class Multiplicacion implements Expresion{
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

    getTipo(ent: TablaSimbolos): Tipo {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierda.getTipo(ent);
        let tipoDerecha = this.derecha.getTipo(ent);
        if(tipoIzquierda.esNumero() && tipoDerecha.esNumero()){
            tipo = new Tipo(TipoDato.numero);
        }
        else if(!tipoIzquierda.esError() && !tipoDerecha.esError()){
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("Multiplicación",tipoIzquierda,tipoDerecha,this.linea,this.columna));
        }
        return tipo;
    }

    getValor(ent: TablaSimbolos): any {
        let tipo = this.getTipo(ent);
        let valor;
        if(!tipo.esError()){
            valor = this.izquierda.getValor(ent) * this.derecha.getValor(ent);
        }
        return valor;

    }


}