import { SingleExpresionType } from "../tipificacion";

export class SingleExpresion{
    Tipo:SingleExpresionType;
    Objeto:Object;
    Inicio:number;
    Fin:number;
    constructor(tipo:SingleExpresionType,objeto:Object,inicio:number, fin:number){
        this.Tipo = tipo;
        this.Objeto = objeto;
        this.Inicio = inicio;
        this.Fin = fin;
    }
}