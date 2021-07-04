
interface Instruccion{
     linea:number;
     columna: number;
     salidaConsola: string;
     ejecutar(ent:Entorno, arbol:AST):any ;
}