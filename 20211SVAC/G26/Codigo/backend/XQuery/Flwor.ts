import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Return } from "./Return";

export class Flwor implements InstruccionXQuery{

    linea: number;
    columna: number;
    retType: Return;
    opcionales: Array<InstruccionXQuery>;
    constructor(opcionales: Array<InstruccionXQuery>, retType: Return, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.retType = retType;
        this.opcionales = opcionales;
    }

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        this.opcionales.forEach((opcional: InstruccionXQuery) => {
            opcional.ejecutar(XQEnt, xmlEnt);
        })
        //Se ejecuta el return y se retorna el resultado (Objeto)
        return this.retType.ejecutar(XQEnt, xmlEnt);
    }

}