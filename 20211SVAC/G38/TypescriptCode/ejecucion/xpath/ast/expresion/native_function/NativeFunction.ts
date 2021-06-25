enum NativeFunction{
    last,
    position,
    text
}

class NativeFunctionExpresion implements Expresion{
    private nativeFunction: NativeFunction;
    linea: number;
    columna: number;


    constructor(nativeFunction: NativeFunction, linea: number, columna: number) {
        this.nativeFunction = nativeFunction;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.numero);
    }

    getValor(ent: TablaSimbolos): any {
        let position;
        switch (this.nativeFunction){
            case NativeFunction.position:
                position = ent.getPosition();
                break;
            case NativeFunction.last:
                position = ent.last;
                break;
        }
        return position;
    }

}