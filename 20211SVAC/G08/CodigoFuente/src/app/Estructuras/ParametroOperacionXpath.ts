import { OperacionXpath } from "./OperacionXpath";
import { TipoParametro } from "./tipificacion";

export class ParametroOperacionXpath{
    Operacion:OperacionXpath;
    Valor:string;
    Tipo:TipoParametro;
    constructor(operacion:OperacionXpath, valor:string,tipo:TipoParametro){
        this.Operacion = operacion;
        this.Valor = valor;
        this.Tipo = tipo;
    }
}