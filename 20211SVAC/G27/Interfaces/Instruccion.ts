
interface Instruccion{
    linea:number;
    columna:number;

    ejecutarInstrucciones(resultadoParcia:Array<Objeto>, elemento:Elemento):any ;
}