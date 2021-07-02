import { Instruccion3D, TipoInstruccion3D } from "./Instruccion3D";


export class Etiqueta3D implements Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D
    identificador: string
    codigo3D: string;
    constructor(tipo: TipoInstruccion3D, identificador: string, codigo3d: string, fila: number, columna: number){
        this.tipo = tipo;
        this.fila = fila;
        this.identificador = identificador;
        this.codigo3D = codigo3d;
        this.columna = columna;
    }
    getCodigo3D(): string{
        return this.codigo3D;
    }

    setCodigo3D(codigo: string): void{
        this.codigo3D = codigo;
    }
    getTipoInstruccion(): TipoInstruccion3D{
        return this.tipo;
    }
}