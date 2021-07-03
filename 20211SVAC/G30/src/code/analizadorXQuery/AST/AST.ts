import { Instruccion } from "../Interfaces/Instruccion";
import { Entorno } from "./Entorno";

export class AST{
    
    public instrucciones:Array<Instruccion>
    public entornos:Array<Entorno> = []

    constructor(instrucciones:Array<Instruccion>, entornos: Entorno){
        this.instrucciones = instrucciones;
        this.entornos.push(entornos);
    }

    CrearEntorno(id, anterior){
        var exist_ent = false;
        for(let ent of this.entornos){
            if(ent.getIdentificador() == id){
                exist_ent = true;
            }
        }
        if (!exist_ent){
            var entorno_nuevo = new Entorno(id,anterior);
            this.entornos.push(entorno_nuevo);
        }
    }

    getEntorno(id): Entorno{
        for(let ent of this.entornos){
            if(ent.getIdentificador() == id){
                return ent;
            }
        }
        return null;
    }

}