import { TIPO_DATO } from '../Expresion/Tipo';
import { Entorno } from '../entorno';

export class Funcion {
    identificador: string;
    tipo: TIPO_DATO;
    L_params: any;
    L_ins: any;
    entorno: Entorno;
    valor: any;

  
    constructor({identificador_,tipo_,L_params_,L_ins_,entorno_,valor_}:{identificador_:string, tipo_: any, L_params_:any,L_ins_:any,entorno_:Entorno,valor_: any}) {
        this.identificador=identificador_;
        this.tipo=tipo_;
        this.L_params=L_params_;
        this.L_ins=L_ins_;
        this.entorno=entorno_;
        this.valor=valor_;
    }

    recorrer(){
        return `ID: ${this.identificador} - TIPO: ${this.tipoString(this.tipo)} - PARAMETROS: ${this.numeroParametros(this.L_params)} - VALOR: ${this.valor}\n`;
    }
    tipoString(i:number){
        switch(i){
            case 0:
                return " ERROR "
            case 1:
                return " NUMBER "
            case 2:
                return " STRING "
            case 3:
                return " BOOLEAN "
            case 4:
                return " ETIQUETA "
            case 5:
                return " FUNCION "
            case 6:
                return " ARREGLO "
        }
        //ERROR,NUMBER,STRING, BOOLEAN, ETIQUETA, FUNCION, ARREGLO
        
        return "";
    }
    numeroParametros(nodo:any){
        return nodo.hijos.length;
    }
  }