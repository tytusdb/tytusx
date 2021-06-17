import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import {Instruccion} from "../Interfaz/instruccion";
import errores from '../Global/ListaError';

export class Atributo implements Instruccion{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno:Entorno):any{
        /* Se debe verificar que no exista el atributo */
        if (!entorno.existeSimbolo(this.identificador)){
            entorno.agregarSimbolo(this.identificador, new Simbolo(Tipo.ATRIBUTO, this.identificador, this.valor, this.linea, this.columna));
        }else{
            /*  Error semantico */
            errores.agregarError('semantico', 'Ya existe el simbolo ' + this.identificador, this.linea, this.columna);
        }
    }
}