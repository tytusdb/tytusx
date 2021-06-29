
export interface Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    getCodigo3D(): string;
    setCodigo3D(codigo: string): void;
    getTipoInstruccion(): TipoInstruccion3D;
}

export enum TipoInstruccion3D{
    ASIGNORMAL,
    ASIGARREGLO,
    ARREGLOASIG,
    ETIQUETA,
    GOTO,
    LLAMADA,
    PRINTF,
    IF,
    RETURN,
    REPRESENTACION,
}