enum NativeFunction{
    last,
    position,
    text
}

class NativeFunctionExpresion extends ExpresionAncestor{
    private nativeFunction: NativeFunction;
    linea: number;
    columna: number;


    constructor(nativeFunction: NativeFunction, linea: number, columna: number) {
        super();
        this.nativeFunction = nativeFunction;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): Tipo {
        return new Tipo(TipoDato.numero);
    }

    getValor(tsXquery:TablaSimbolosXquery,ent: TablaSimbolos): any {
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