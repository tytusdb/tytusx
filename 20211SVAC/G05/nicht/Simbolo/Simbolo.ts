//import {AST} from './AST';
import {Tipo} from './Tipo'
import {Entorno} from './Entorno'

export class Simbolo {
    public indentificador: string;
    public valor: any;
    public tipo: Tipo;
    public entorno: Entorno;
    linea: number;
    columna: number;

    constructor(tipo:Tipo, id:string, linea:number, columna:number,value:any,ent: Entorno){
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor=value;
        this.entorno=ent;
    }

    

    public ToString() :string
    {
        return String(this.valor);
    }
    
}