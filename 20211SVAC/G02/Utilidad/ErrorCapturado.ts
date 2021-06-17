class ErrorCapturado {
    mensaje: string;
    linea: number;
    columna: number;
    tipoError: TipoError;
    token: string;

    constructor(tipoError: TipoError, token: string, mensaje: string, linea: number, columna: number) {
        this.mensaje = mensaje;
        this.tipoError = tipoError;
        this.token = token;
        this.linea = linea;
        this.columna = columna;
    }
}