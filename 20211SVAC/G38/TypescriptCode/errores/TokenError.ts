enum TipoError{
    Lexico="Lexico",
    Sintactico = "Sintactico",
    Semantico = "Semantico",
}

class TokenError{
    private _tipoError: TipoError;
    private _mensaje: string;
    private _linea: number;
    private _columna: number;


    constructor(tipoError: TipoError, mensaje: string, linea: number, columna: number) {
        this._tipoError = tipoError;
        this._mensaje = mensaje;
        this._linea = linea;
        this._columna = columna;
    }


    get tipoError(): TipoError {
        return this._tipoError;
    }

    get mensaje(): string {
        return this._mensaje;
    }

    get linea(): number {
        return this._linea;
    }

    get columna(): number {
        return this._columna;
    }
}