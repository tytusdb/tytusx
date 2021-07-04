enum TipoNumerico{
    suma="+",
    resta="-",
    multiplicacion="*",
    division="/",
    modulo="%"
}
class ExpresionNumerica extends Codigo3d{
    private _tipoNumerico: TipoNumerico;
    private _primitivoIzquierda: Primitiva;
    private _primitivoDerecha: Primitiva;


    constructor(tipoNumerico: TipoNumerico, primitivoIzquierda: Primitiva, primitivoDerecha: Primitiva,
                linea:number,columna:number) {
        super(linea,columna);
        this._tipoNumerico = tipoNumerico;
        this._primitivoIzquierda = primitivoIzquierda;
        this._primitivoDerecha = primitivoDerecha;
    }


    get tipoNumerico(): TipoNumerico {
        return this._tipoNumerico;
    }

    get primitivoIzquierda(): Primitiva {
        return this._primitivoIzquierda;
    }

    get primitivoDerecha(): Primitiva {
        return this._primitivoDerecha;
    }

    set primitivoIzquierda(value: Primitiva) {
        this._primitivoIzquierda = value;
    }

    set primitivoDerecha(value: Primitiva) {
        this._primitivoDerecha = value;
    }

    set tipoNumerico(value: TipoNumerico) {
        this._tipoNumerico = value;
    }

    public toString():string{
        let cadenaSalida = this.primitivoIzquierda.toString()+" "+ this.tipoNumerico.toString()+" "+this.primitivoDerecha.toString();
        return cadenaSalida;
    }
}