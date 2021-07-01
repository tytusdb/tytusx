import { Simbolo } from "./Simbolo";


export class Entorno{
    private anterior:Entorno;
    private tabla:{[id:string] : Simbolo};

    constructor(ant:any){
        this.tabla = {};
        this.anterior = ant;
    }

    nuevo(id:string, symbol:Simbolo){
        id = id.toLowerCase();
        symbol.iden = symbol.iden.toLowerCase();
        this.tabla[id] = symbol;
    }

    borrar(id:string):boolean{
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {   
            const value = e.tabla[id]
            if (value!==undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    comprobar(id:string):boolean{           // comprobar si existe
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    comprobaractual(id:string):boolean{     //comprobar en entorno actual
        id = id.toLowerCase();
        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id:string):any{
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazo(id:string, nuevo:Simbolo){
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevo;
            }
        }
    }

}