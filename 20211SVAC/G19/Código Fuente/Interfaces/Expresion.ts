
interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:any, arbol:any):string ;
     getValorImplicito(ent:any, arbol:any):any;
     
}