

interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Entorno, arbol:AST):Tipo ;
     getValorImplicito(ent:Entorno, arbol:AST):any;
     
}