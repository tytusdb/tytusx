export class Nodo{
    public etiqueta:String
    public valor: Object
    
    public linea:number
    public columna: number
    constructor(etiqueta:String, valor:Object, linea: number, columna:number){
        this.etiqueta=etiqueta;
        this.valor=valor;
        
        this.linea=linea
        this.columna=columna
    }
    agregarHijo(hijo:Nodo){
        
    }
}