class ListaFunciones {
    private static listaFunciones: ListaFunciones;
    private tabla:{[id:string] : Funcion};

    constructor() {
        this.tabla = {};
    }

    public static agregarFuncion(nombre:string, funcion:Funcion){
        if(this.listaFunciones == null || this.listaFunciones == undefined){
            this.listaFunciones = new ListaFunciones();
        }
        this.listaFunciones.tabla[nombre] = funcion;
    }

    public static existe(nombre:string):boolean{
        if(this.listaFunciones == null || this.listaFunciones == undefined){
            this.listaFunciones = new ListaFunciones();
        }
        const value = this.listaFunciones.tabla[nombre]
        if (value!=undefined && value!=null)
        {
            return true;
        }
        return false;
    }

    public static  getFuncion(nombre:string):Funcion{
        if(this.listaFunciones == null || this.listaFunciones == undefined){
            this.listaFunciones = new ListaFunciones();
        }
        const value = this.listaFunciones.tabla[nombre]
        if (value!=undefined && value!=null)
        {
            return value;
        }
        return null;
    }

    public static limipiarFunciones(){
        this.listaFunciones = new ListaFunciones();
    }
}