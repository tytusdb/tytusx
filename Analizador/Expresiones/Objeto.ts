import { Atributo } from "./Atributo";

export class Objeto{
    

    public constructor(public id:string, public texto:string, public linea:number, public columna:number, public listaAtributos:Array<Atributo>, public listaO:Array<Objeto>){
        
    }
}