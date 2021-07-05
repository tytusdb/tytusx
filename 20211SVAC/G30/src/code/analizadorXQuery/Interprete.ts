import { parse } from './XQuery'

export class Interprete {

   constructor() {
   }

interpretar(entrada:string):any{
    
    var analizador = parse(entrada);
    return analizador;

}

}

