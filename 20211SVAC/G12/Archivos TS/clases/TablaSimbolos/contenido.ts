import Simbolos from "./Simbolos";

export default class contenido {
    public identificador:string;
    public sim:Simbolos;
    constructor(identificador:string,sim:Simbolos){
        this.identificador=identificador;
        this.sim=sim;
    }
    
}