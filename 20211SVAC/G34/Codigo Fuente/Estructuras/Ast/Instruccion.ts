interface Instruccion{
    linea:number;
    columna: number;
   
    ejecutar(ent:TablaSimbolos, arbol:AST):any ;
}