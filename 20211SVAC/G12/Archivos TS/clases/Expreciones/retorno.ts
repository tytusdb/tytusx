import Tipo from "../TablaSimbolos/Tipo";
import { GeneradorC3D } from "../GeneradorC3D/GeneradorC3D";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export class retorno {
    valor:string;
    istemp:boolean;
    tipo:Tipo;
    lblTrue: string;
    lblFalse: string;

    constructor(valor:string,istemp:boolean,tipo:Tipo){
        this.valor=valor;
        this.istemp=istemp;
        this.tipo=tipo;
        this.lblTrue=this.lblFalse='';
    }   

    public getvalor3d() {
        return this.valor;
    }
}