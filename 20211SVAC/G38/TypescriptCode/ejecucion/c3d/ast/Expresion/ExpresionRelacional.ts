enum TipoRelacional{
    lt="<",
    lte="<=",
    gt=">",
    gte=">=",
    equal_equal="==",
    nequal="!="
}
class ExpresionRelacional extends Codigo3d{
    private _tipoRelacional: TipoRelacional;
    private _primitivaIzquierda: Primitiva;
    private _primitivaDerecha: Primitiva;


    constructor(tipoRelacional: TipoRelacional, primitivaIzquierda: Primitiva, primitivaDerecha: Primitiva,
                linea:number,columna:number) {
        super(linea,columna);
        this._tipoRelacional = tipoRelacional;
        this._primitivaIzquierda = primitivaIzquierda;
        this._primitivaDerecha = primitivaDerecha;
    }

    public negarTipoRelacional(){
        switch (this._tipoRelacional){
            case TipoRelacional.gt:
                this._tipoRelacional = TipoRelacional.lt
                break;
            case TipoRelacional.gte:
                this._tipoRelacional = TipoRelacional.lt
                break;
            case TipoRelacional.lt:
                this._tipoRelacional = TipoRelacional.gt
                break;
            case TipoRelacional.lte:
                this._tipoRelacional = TipoRelacional.gt
                break;
            case TipoRelacional.equal_equal:
                this._tipoRelacional = TipoRelacional.nequal
                break;
            case TipoRelacional.nequal:
                this._tipoRelacional = TipoRelacional.equal_equal
                break;
        }
    }

    get tipoRelacional(): TipoRelacional {
        return this._tipoRelacional;
    }

    set tipoRelacional(value: TipoRelacional) {
        this._tipoRelacional = value;
    }

    get primitivaIzquierda(): Primitiva {
        return this._primitivaIzquierda;
    }

    set primitivaIzquierda(value: Primitiva) {
        this._primitivaIzquierda = value;
    }

    get primitivaDerecha(): Primitiva {
        return this._primitivaDerecha;
    }

    set primitivaDerecha(value: Primitiva) {
        this._primitivaDerecha = value;
    }

    public toString():string{
        let cadenaSalida = this.primitivaIzquierda.toString()+" "+ this.tipoRelacional.toString()+" "+this.primitivaDerecha.toString();
        return cadenaSalida;
    }
}