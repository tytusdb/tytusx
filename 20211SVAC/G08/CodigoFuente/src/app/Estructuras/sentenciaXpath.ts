import {parametroXpath} from './parametroXpath';
import {NodoXpath} from './NodoXpath';
import { ParametroOperacionXpath } from './ParametroOperacionXpath';
export class sentenciaXpath {
    Tipo:NodoXpath;
    Parametro: ParametroOperacionXpath;
    Padre:sentenciaXpath;
    Hijo:sentenciaXpath;
    constructor(tipo:NodoXpath, parametro:ParametroOperacionXpath, padre:sentenciaXpath){
        this.Tipo = tipo;
        this.Parametro = parametro;
        this.Padre = padre;
    } 
}
