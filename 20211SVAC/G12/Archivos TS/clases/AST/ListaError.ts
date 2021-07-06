import { errorLex } from "../Analizar";
import Errores from "./Errores";


export class LErrores {
    constructor(tipo: string, descripcion: string, analizador: string, linea: number, columna: number) {
        console.log("hay un error");
        errorLex.push(new Errores(tipo,descripcion,linea,columna,analizador));
        console.log(errorLex);
    }
}