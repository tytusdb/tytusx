import { TablaSimbolos } from "./TablaSimbolos";

export default class ambito {
    public sig : TablaSimbolos;
    public identificador:string;

    constructor(identificador:string,sig : TablaSimbolos){
        this.identificador=identificador;
        this.sig=sig;
    }
}