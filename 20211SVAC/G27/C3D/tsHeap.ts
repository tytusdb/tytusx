class tsHeap{
    public listaObjetos: Array<tsObjetoHeap>;
    constructor(){
        this.listaObjetos = new Array<tsObjetoHeap>();
    }   

    public insertarObjeto(posicion:number, valor:string)
    {
        var objeto = new tsObjetoHeap(posicion, valor);
        this.listaObjetos.push(objeto);
    }

    public getCantidadObjetos(): number
    {
        return this.listaObjetos.length;
    }
}