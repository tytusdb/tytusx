import Objeto from "src/app/Backend/XML/Analizador/Expresiones/Objeto";

export class CST{
    //this.nombre, this.precio, this.urlfoto, this.descripcion, 1, palabra, this.categoria
    columna?:number;
    contenido?:Objeto[]| String;
    identificador?:string;
    linea?:number;
    listaAtributos?:[];
    listaObjetos?: CST[];
    
}