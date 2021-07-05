
export interface Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    eliminada: boolean;
    optimizada: boolean;
    getCodigo3D(): string;
    setCodigo3D(codigo: string): void;
    getTipoInstruccion(): TipoInstruccion3D;
    isEliminada(): boolean;
    setEliminada(eliminar: boolean): void;
    isOptimizada(): boolean;
    setOptimizada(optimizada: boolean): void;
}

export enum TipoInstruccion3D{
    ASIGNORMAL,
    ASIGARREGLO,
    ARREGLOASIG,
    ARREGLOASIGARREGLO,
    ETIQUETA,
    GOTO,
    LLAMADA,
    PRINTF,
    IF,
    RETURN,
    REPRESENTACION,
}