import { Declaracion3D, TipoDeclaracion3D } from "./Declaracion3D";

export class Include implements Declaracion3D{
    fila: number;
    columna: number;
    tipo: TipoDeclaracion3D;
    codigo3Dir: string
    constructor(tipo: TipoDeclaracion3D, codigo3D: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3Dir = codigo3D;
    }

    getCodigo3Dir(): string{
        return this.codigo3Dir;
    }
    setCodigo3Dir(codigo: string): void{
        this.codigo3Dir = codigo;
    }

    optimizar(){
        
    }
}