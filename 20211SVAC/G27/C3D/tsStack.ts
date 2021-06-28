class tsStack{
    public listaObjetos: Array<tsObjetoStack>;
    constructor(){
        this.listaObjetos = new Array<tsObjetoStack>();
    }

    public getObjetoPorID(id:string): tsObjeto{
        var cantidadObjetos = this.listaObjetos.length;
        for (var i = 0; i < cantidadObjetos; i++)
        {
            
        }
        return null;
    }

    /*public insertarObjeto(tipo: any, apuntadorName: any, apuntadorAtributos: any, apuntadorHijos: any, apuntadorContenido: any)
    {
        //var objeto = new tsObjetoStack(tipo, apuntadorName, apuntadorAtributos, apuntadorHijos,apuntadorContenido);
        this.listaObjetos.push(objeto);
    }*/

    public getCantidadObjetos(): number
    {
        return this.listaObjetos.length;
    }
}