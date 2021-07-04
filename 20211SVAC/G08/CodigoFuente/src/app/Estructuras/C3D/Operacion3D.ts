import { TipoDato, TipoOperador, TipoParametro } from "../tipificacion";

export class OperacionC3D{
    Fila: number;
    Columna: number;
    TipoOperador:TipoOperador;
    ExpresionIzquierda: Simbolo;
    ExpresionDerecha: Simbolo;
    C3D:string;
    constructor( fila: number, columna: number, tipoOperador:TipoOperador, expresionIzquierda: Simbolo, expresionDerecha: Simbolo, c3d:string){
        this.Fila = fila;
        this.Columna = columna;
        this.TipoOperador = tipoOperador;
        this.ExpresionIzquierda = expresionIzquierda;
        this.ExpresionDerecha = expresionDerecha;
        this.C3D = c3d;
    }
}

export class Simbolo{
    Fila: number;
    Columna: number;
    Valor:object;
    C3D:string;
    TipoDato:TipoDato;
    TipoParametro:TipoParametro;

    constructor( fila: number, columna: number, valor:object, c3d:string, tipoDato:TipoDato, tipoParametro:TipoParametro){
        this.Fila = fila;
        this.Columna = columna;
        this.Valor = valor;
        this.C3D = c3d;
        this.TipoDato = tipoDato;
        this.TipoParametro = tipoParametro;
    }

}