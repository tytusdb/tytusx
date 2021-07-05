import _ = require("lodash");
import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { identificador } from "./identificador";
import { Primitivo } from "./primitivo";

export class funcion_nativa extends Instruccion {
  id: string;
  valor: any;
  inicio: any; 
  fin: any; 


  constructor(linea: string, id: string, valor: any, inicio:any = null,fin:any = null) {
    super(linea);
    Object.assign(this, { id, valor,inicio,fin });
  }

  //falta retorno si es INST y se manda a llamar desde una variable, path 
  ejecutar(e: Entorno) {

    if(this.valor instanceof identificador){
      this.valor = this.valor.ejecutar(e);
    }

    if(this.valor instanceof Primitivo){
      this.valor = this.valor.ejecutar(e);
    }

    if(this.id == 'F_UPPERCASE'){
        let cadena = this.valor.toUpperCase()
        return cadena;
    }

    if(this.id == 'F_LOWERCASE'){
        let cadena = this.valor.toLowerCase()
        return cadena;
    }

    if(this.id == 'F_STRING'){
        let cadena = this.valor.toString()
        return cadena; 
    }

    if(this.id == 'F_NUMBER'){
        let cadena = Number(this.valor)
        return cadena;
    }

    if(this.id == 'F_SUBSTRING'){ 
        let inicial = this.inicio;
        let cadena = this.valor.substring(inicial);
        this.inicio = 0;
        return cadena;
    }

    if(this.id == 'F_SUBSTRING1'){
        let cadena = this.valor.substring(this.inicio,this.fin+1);
        this.fin = 0;
        this.inicio = 0;
        return cadena;
    }
  }
}