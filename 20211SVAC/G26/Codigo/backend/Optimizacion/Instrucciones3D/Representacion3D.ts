import { Instruccion3D, TipoInstruccion3D } from "./Instruccion3D";

/*
**  CLASE AUXILIAR PARA MEJORAR EL REPORTE DE OPTIMIZACION
** SERVIRA PARA ENVIAR REPRESENTACIONES DE TIPO '<instrucciones L2>' 
** Para acortar el codigo eliminado y mejorado (asi no se incluye literalmente las instrucciones)
*/

export class Representacion3D implements Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    optimizada: boolean;
    eliminada: boolean;
    constructor(tipo: TipoInstruccion3D, codigo3D: string, fila: number, columna: number){
        this.codigo3D = codigo3D;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
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