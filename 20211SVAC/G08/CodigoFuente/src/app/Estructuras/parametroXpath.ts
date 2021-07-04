import { OperacionXpath } from "./OperacionXpath";
import { TipoOperador } from "./tipificacion";

export class parametroXpath {
    OperacionIzquierda:OperacionXpath;
    OperacionDerecha:OperacionXpath;
    SingleOperacion:OperacionXpath;
    TipoOperador:TipoOperador;
    constructor( operacionIzquierda:OperacionXpath,operacionDerecha:OperacionXpath,singleOperacion:OperacionXpath,tipoOperador:TipoOperador){
       this.OperacionIzquierda = operacionIzquierda;
       this.OperacionDerecha = operacionDerecha;
       this.TipoOperador = tipoOperador;
       this.SingleOperacion = singleOperacion;
    }

}