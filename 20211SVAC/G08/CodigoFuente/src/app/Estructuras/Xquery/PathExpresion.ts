import { sentenciaXpath } from "../sentenciaXpath";

export class PathExpresion{
    Varname:string;
    Sentencia:sentenciaXpath;
    constructor(Varname:string, Sentencia:sentenciaXpath){
        this.Varname = Varname;
        this.Sentencia = Sentencia;
    }
}