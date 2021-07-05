import { Entorno } from "../AST/Entorno";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { TranslateXQuery } from "../Traduccion/TranslateXQuery";

export interface InstruccionXQuery{
    linea: number;
    columna: number;
    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery): string;
    ejecutar(entornoXQuery:Entorno, entornoXML: Entorno):any;
}