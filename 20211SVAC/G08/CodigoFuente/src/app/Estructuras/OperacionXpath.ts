import { ParametroOperacionXpath } from "./ParametroOperacionXpath";
import { TipoOperador } from "./tipificacion";

export class OperacionXpath{
    ParametroIzquierdo:ParametroOperacionXpath;
    ParametroDerecho:ParametroOperacionXpath;
    TipoOperador:TipoOperador;
    constructor(parametroIzquierdo:ParametroOperacionXpath, parametroDerecho:ParametroOperacionXpath, tipoOperador:TipoOperador){
        this.ParametroDerecho = parametroDerecho;
        this.ParametroIzquierdo = parametroIzquierdo;
        this.TipoOperador = tipoOperador;
    }
}