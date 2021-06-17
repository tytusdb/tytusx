export class NodoAST{
    public dato;
    public hijos:NodoAST[];

    constructor(dato:any){
        this.dato = dato;
        this.hijos = [];
    }
    public addHijo(dato:NodoAST){
        this.hijos.push(dato);
    }

    public getDato():String{
        return this.dato;
    }
    public getHojas():Array<NodoAST>{
        return this.hijos;
    }
}