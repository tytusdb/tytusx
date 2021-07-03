class ListaErrores
{
    listaerrores:Array<NodoError>;
    constructor()
    {
        this.listaerrores = new Array<NodoError>();
    }

    setError(valor:NodoError):void
    {
        this.listaerrores.push(valor);
    }
}