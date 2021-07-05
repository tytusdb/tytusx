import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";
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

    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery){
        let code = "";
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        this.opcionales.forEach((opcional: InstruccionXQuery) => {
            code += opcional.getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery);
        })
        //Se ejecuta el return y se retorna el resultado (Objeto)
        code += this.retType.getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery);        
        return code;
    }

    ejecutar(XQEnt: Entorno, xmlEnt: Entorno){
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        console.log("ejecutando FLwor")
        this.opcionales.forEach((opcional: InstruccionXQuery) => {
            opcional.ejecutar(XQEnt, xmlEnt);
        })
        //Se ejecuta el return y se retorna el resultado (Objeto)
        let x = this.retType.ejecutar(XQEnt, xmlEnt);
        console.log("x", x)
        return x;
    }

}