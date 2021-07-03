import { Objeto } from "../Expresiones/Objeto";
import { Atributo } from "../Expresiones/Atributo";
import { CST } from "../CST/CST";


export class Raiz{
    objeto:Objeto;
    config: Array<Atributo>;
    errores: Array<string>;
    cst: Array<CST>

    constructor(objeto: Objeto, config: Array<Atributo>, errores: Array<string>, cst: Array<CST> ){
        this.objeto = objeto
        this.config = config 
        this.errores = errores
        this.cst = cst
    }
}