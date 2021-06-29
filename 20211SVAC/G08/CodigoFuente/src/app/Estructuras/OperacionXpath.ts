import { NodoXpath } from "./NodoXpath";
import { ParametroOperacionXpath } from "./ParametroOperacionXpath";
import { sentenciaXpath } from "./sentenciaXpath";
import { TipoOperador } from "./tipificacion";

export class OperacionXpath{
    ParametroIzquierdo:ParametroOperacionXpath;
    ParametroDerecho:ParametroOperacionXpath;
    TipoOperador:TipoOperador;
    Sentencia:sentenciaXpath;
    constructor(parametroIzquierdo:ParametroOperacionXpath, parametroDerecho:ParametroOperacionXpath, tipoOperador:TipoOperador,sentencia:sentenciaXpath){
        this.ParametroDerecho = parametroDerecho;
        this.ParametroIzquierdo = parametroIzquierdo;
        this.TipoOperador = tipoOperador;
        this.Sentencia = sentencia;
    }
}