

export interface Expresion3D{
    fila: number;
    columna: number;
    tipo: TipoExpresion3D;
    codigo3D: string;
    getCodigo3D(): string;
    getTipoExpresion(): TipoExpresion3D;
}

export enum TipoExpresion3D{
    PRIMITIVA,
    OPERACION,
}