import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { TiposXpath } from "./TiposXpath";

export class Dato implements NodoRutaXpath {
    linea: number;
    columna: number;
    valor: any;

    constructor(valor:any, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }

    getTipo(arbol: ArbolXpath): TiposXpath {
        const valor = this.getValorImplicito(arbol);
        if (typeof(valor) === 'boolean')
        {
            return TiposXpath.BOOL;
        }
        else if (typeof(valor) === 'string')//aplica para cadena
        {
            return TiposXpath.STRING; 
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return TiposXpath.INT;
            }
           return TiposXpath.DOUBLE;
        }
        else if(valor === null){
            return TiposXpath.NULL;
        }
            
        else {
            //evaluar si es una ruta(consulta), funcion , metodo 

        }
        return TiposXpath.VOID;
    }

    getValorImplicito(arbol: ArbolXpath) {
        return this.valor;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
    
}