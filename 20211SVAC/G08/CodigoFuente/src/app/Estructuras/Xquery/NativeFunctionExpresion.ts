import { TipoFuncion } from "../tipificacion";
import { SingleExpresion } from "./SingleExpresion";

export class NativeFunctionExpresion{
    NameFunction:Funcion;
    Value: SingleExpresion[]; 
    constructor(NameFunction:Funcion,Value: SingleExpresion[]){
        this.NameFunction = NameFunction;
        this.Value = Value;
    }
}
export class Funcion{
    TipoFuncion:TipoFuncion;
    Valor:Object;
    constructor(TipoFuncion:TipoFuncion, Valor:Object){
        this.TipoFuncion = TipoFuncion;
        this.Valor = Valor;
    }
}