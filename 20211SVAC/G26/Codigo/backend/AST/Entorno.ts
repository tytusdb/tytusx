import errores from "../Global/ListaError";
import {Simbolo} from "./Simbolo";
import { Tipo } from "./Tipo";

export class Entorno{
    nombre:string;
    padre:any;
    global:any;
    tsimbolos:Array<any>;

    constructor(nombre:string, padre:any, global:any){
        this.tsimbolos = new Array();
        this.nombre = nombre;
        this.padre = padre;
        if (global === null)
            this.global = this;
        else
            this.global = global;
    }

    agregarSimbolo(nombre:string, simbolo:Simbolo):void{
        this.tsimbolos.push({'nombre':nombre,'valor': simbolo});
    }

    sobreEscribirSimbolo(nombre:string, simbolo:Simbolo):boolean{
        for(let a:Entorno = this; a != null; a = a.padre){
            for(let i = 0; i < a.tsimbolos.length; i++){
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()){
                    let nuevo = {'nombre':nombre,'valor': simbolo}
                    a.tsimbolos[i] = nuevo;
                    return true;
                }
            }
        }
        errores.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return false;        
    }

    private getStringTipo(t:Tipo):string{
        switch(t){
            case Tipo.STRING:
                return 'Cadena';
            case Tipo.ETIQUETA:
                return 'Etiqueta';
            case Tipo.ATRIBUTO:
                return 'Atributo';
            case Tipo.XQ_FUNC:
                return "Funcion XQuery";
            case Tipo.XQ_VAR:
                return "Variable XQuery";
        }
        return '';
    }

    obtenerSimbolo(nombre:string):any{
        for(let a:Entorno = this; a != null; a = a.padre){
            for(let i = 0; i < a.tsimbolos.length; i++){
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()){
                    return a.tsimbolos[i].valor;
                }
            }
        }
        errores.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return null;
    }

    /* Metodo para cambiar el valor del simbolo */
    setSimbolo(nombre:string, simbolo:Simbolo){
        //console.log("Entra a set simbolo");
        for(let a:Entorno = this; a != null; a = a.padre){
            for(let i = 0; i < a.tsimbolos.length; i++){
                //console.log(a.tsimbolos[i].nombre.toString().toLowerCase());
                //console.log(nombre.toString().toLowerCase());
                let aux = a.tsimbolos[i];
                if (aux.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()){
                    aux.valor = simbolo;
                    //console.log(a.tsimbolos[i].valor);
                    //console.log(this.tsimbolos[i].valor);
                    return;
                }
            }
        }
    }

    /* Verifica si el simbolo existe en el entorno actual */
    existeSimbolo(nombre:string):boolean{
        for(let i = 0; i < this.tsimbolos.length; i++){
            if (this.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                return true;
        }
        return false;
    } 
}