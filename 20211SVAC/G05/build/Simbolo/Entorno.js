"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(anterior) {
        //this.tabla = {};
        this.tablita = [];
        this.anterior = anterior;
    }
    agregar(id, simbolo) {
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        //this.tabla[id] = simbolo;
        this.tablita.push(simbolo);
    }
    /*
        eliminar(id:string):boolean{
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
    */
    /*
    existe(id:string):boolean{
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
    */
    /*
        existeEnActual(id:string):boolean{
            id = id.toLowerCase();
            if (this.tabla[id]!==undefined)
            {
                return true;
            }
            return false;
        }
    */
    existeEnActual(id) {
        id = id.toLowerCase();
        for (let i = 0; i < this.tablita.length; i++) {
            if (this.tablita[i].indentificador == id) {
                return true;
            }
        }
        /*
        this.tablita.forEach(simbol => {
            if(simbol.indentificador==id){
                return true;
            }
        });*/
        return false;
    }
    getSimbolo(id) {
        id = id.toLowerCase();
        for (let i = 0; i < this.tablita.length; i++) {
            if (this.tablita[i].indentificador == id) {
                return this.tablita[i];
            }
        }
        /*
        this.tablita.forEach(simbol => {
            if(simbol.indentificador==id){
                return simbol;
            }
        });*/
        return null;
    }
}
exports.Entorno = Entorno;
