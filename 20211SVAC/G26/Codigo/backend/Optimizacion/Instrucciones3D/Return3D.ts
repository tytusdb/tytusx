import { Instruccion3D, TipoInstruccion3D } from "./Instruccion3D";


export class Return3D implements Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    eliminada: boolean;
    optimizada: boolean;
    constructor(tipo: TipoInstruccion3D, codigo3d: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo
        this.codigo3D = codigo3d;
        this.eliminada = false;
        this.optimizada = false;
    }

    isOptimizada(): boolean{
        return this.optimizada;
    }

    setOptimizada(optimizada: boolean){
        this.optimizada = optimizada;
    }
    isEliminada(): boolean {
        return this.eliminada;
    }

    setEliminada(eliminada: boolean){
        this.eliminada = eliminada;
    }
    
    getTipoInstruccion(): TipoInstruccion3D{
        return this.tipo;
    }

    setCodigo3D(codigo: string): void{
        this.codigo3D = codigo;
    }

    getCodigo3D(): string{
        return this.codigo3D;
    }
}
