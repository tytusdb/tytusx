import { TipoInstruccion } from "../tipificacion";
import { OperacionC3D, Simbolo } from "./Operacion3D";

export class Instruccion3D{
    TipoInstruccion:TipoInstruccion;
    Dato:Object;
    constructor(tipoInstruccion:TipoInstruccion, dato:Object){
        this.TipoInstruccion = tipoInstruccion;
        this.Dato = dato;
    }
}

export class Asignacion{
    Fila: number;
    Columna: number;
    C3D:string;
    ID:string;
    Operacion:OperacionC3D;
    constructor( fila: number, columna: number, id:string ,operacion:OperacionC3D, c3d:string){
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.Operacion = operacion;
        this.C3D = c3d;
    }
}

export class AsignacionArray{
    Fila: number;
    Columna: number;
    C3D:string;
    ID:string;
    Simbolo:Simbolo;
    constructor( fila: number, columna: number, id:string ,simbolo:Simbolo, c3d:string){
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.Simbolo = simbolo;
        this.C3D = c3d;
    }
}

export class Etiqueta{
    Fila: number;
    Columna: number;
    C3D:string;
    ID:string;
    constructor( fila: number, columna: number, id:string , c3d:string){
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.C3D = c3d;
    }
}
