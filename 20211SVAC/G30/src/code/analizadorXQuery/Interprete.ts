import { parse } from './XQuery'

export class Interprete {

   constructor() {
   }

interpretar(entrada:string):any{
    
    var analizador = parse(entrada);
    return analizador;

}

}

//esta clase unicamente sirve como puente para enlazar datos entre el analizador xquery.js y navigation.js
