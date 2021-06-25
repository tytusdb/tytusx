import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";

export class Entorno{
    public ambito:Simbolo[];
    public padre:any;

    constructor(padre?:any){
        if(padre!=undefined || padre!=null){
            this.padre = padre;
        }else{
            this.padre = null;
        }
        this.ambito = [];
    }

    public insertarObjeto(nuevo:Simbolo){
        this.ambito.push(nuevo);
    }
    public eliminarObjeto(){
        //Eliminar un entrono (creo que no necesitamos)
    }
    public getAtributos(){
        //retornar todos los atributos dentro del entorno
        let result:Simbolo[] = [];
        this.ambito.forEach(element => {
            if(element.tipo == Tipo.ATRIBUTO){
                result.push(element);
            }
        });
        return result;
    }
    public existe(nombre:String){
        //verificar si existe un objeto dentro de un entorno
    }

    public getNodo(nombre:String){
        //busacr todos los que se llamen asi
    }
}