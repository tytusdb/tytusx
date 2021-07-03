import {Simbolo} from './Simbolo'

export class Entorno{
    private padre:Entorno;  //Guarda a que entorno pertenece el actual
    private tabla:{[id:string] : Simbolo}; // Tabla de simbolos
    private nombre:string; // Para guardar el nombre del entorno Ej. Global

    constructor(padre:any, nombre:string){
        this.tabla = {};
        this.padre = padre;
        this.nombre = nombre;
    }

    agregarItem(id:string, simbolo:Simbolo){
        id = id.toLowerCase();
        simbolo.id = simbolo.id.toLowerCase();  // validar que no se repita
        this.tabla[id] = simbolo;
    }

}