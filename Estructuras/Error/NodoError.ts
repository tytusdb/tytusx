export class NodoError
{
    public constructor(public lexema:string, public tipoerror:string, public descripcion:string, public linea:number, public columna:number){}
}