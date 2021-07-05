import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";
import { DeclaracionFor } from "./DeclaracionFor";

export class For implements InstruccionXQuery{
    linea: number;
    columna: number;
    listaFor: Array<DeclaracionFor>;
    constructor(listaFor: Array<DeclaracionFor>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.listaFor = listaFor;

    }

    ejecutar(XQueryEnt: Entorno, xmlEnt: Entorno){
        //Un for puede ser: for $x in //book, at $i in //bok (Separados por coma)
        console.log("Ejecutando for");
        for(let i = 0; i < this.listaFor.length; i++){
            let forElem = this.listaFor[i];
            forElem.ejecutar(XQueryEnt, xmlEnt);
        }
    }

    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt:Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery): string{
        let code = "";
        for(let i = 0; i < this.listaFor.length; i++){
            let forElem = this.listaFor[i];
            code += forElem.getCodigo3Dir(XQueryEnt, xmlEnt,traductorXPath, traductorXQuery);
        }
        return code;
    }
}