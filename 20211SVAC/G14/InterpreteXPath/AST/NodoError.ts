export class NodoError {
    private tipo:string;
    private descripcion:string;
    private fila: Number;

    constructor(tipo:string, descripcion:string, fila:Number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
    }

    public gettipo():string{
        return this.tipo;
    }

    public getdescripcion():string{
        return this.descripcion;
    }

    public getfila():Number{
        return this.fila;
    }

}