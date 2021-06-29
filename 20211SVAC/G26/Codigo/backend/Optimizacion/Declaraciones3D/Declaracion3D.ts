export interface Declaracion3D{
    fila: number;
    columna: number;
    tipo: TipoDeclaracion3D;
    codigo3Dir: string;
    optimizar(): any;
    getCodigo3Dir(): string;
    setCodigo3Dir(codigo: string): void

}

export enum TipoDeclaracion3D{
    INCLUDE,
    ARREGLO,
    VARIABLE,
    MAIN,
    METODO
}