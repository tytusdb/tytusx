class Arbol{
    public id:string;
    public Raiz:Nodo;
    public CantidadNodos:Number;

    constructor(id:string, Raiz:Nodo)
    {
        this.id = id;
        this.Raiz = Raiz;
        this.CantidadNodos = 0;
    }
}