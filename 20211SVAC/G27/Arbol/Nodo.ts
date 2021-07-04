class Nodo{
    public id: any;
    public valor: any;
    public hijos: Array<Nodo>;

    constructor(id:any, valor:any)
    {
        this.id = id;
        this.valor = valor;
        this.hijos = new Array<Nodo>();
    }

    getCantidadHijos():Number{
        return this.hijos.length;
    }

    getHijos():Array<Nodo>{
        return this.hijos;
    }

    insertHijo(id:any, valor:any){
        var hijo = new Nodo(id, valor);
        this.hijos.push(hijo);
    }

}