import { Instruccion3D } from "./Instruccion3D";

export class Declaracion3D{
    Fila: number;
    Columna: number;
    C3D:string;
    Instruccion3D:Instruccion3D[];
    ID:string;
    //Tipo:TipoDeclaracion;
    constructor(fila: number, columna: number, instruccion3D:Instruccion3D[], id:string, c3d:string){
        this.Fila = fila;
        this.Columna = columna;
        this.C3D = c3d;
        this.Instruccion3D = instruccion3D;
        this.ID = id;
    }
}