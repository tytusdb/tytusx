import { OperacionXpath } from "./OperacionXpath";
import { TipoParametro } from "./tipificacion";
import { LlamadoFuncion } from "./Xquery/SentenciaXquery";

export class ParametroOperacionXpath{
    Operacion:OperacionXpath;
    Valor:string;
    Tipo:TipoParametro;
    Funcion:LlamadoFuncion;
    constructor(operacion:OperacionXpath, valor:string,tipo:TipoParametro,funcion:LlamadoFuncion){
        this.Operacion = operacion;
        this.Valor = valor;
        this.Tipo = tipo;
        this.Funcion = funcion;
    }
}