class TablaSimbolos
{
    //Clase tabla simbolos
    private anterior:TablaSimbolos;
    private tabla:{[id:string] : NodoTablaSimbolo};

    constructor(anterior:any){
        this.tabla = {};
        this.anterior = anterior;
    }

    agregar(id:string, simbolo:NodoTablaSimbolo){
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.tabla[id] = simbolo;
    }


    existe(id:string):boolean{
        id = id.toLowerCase();
        for (let e:TablaSimbolos = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id:string):boolean{
        id = id.toLowerCase();
        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id:string):any{
        id = id.toLowerCase();
        for (let e:TablaSimbolos = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id:string, nuevoValor:NodoTablaSimbolo){
        id = id.toLowerCase();
        for (let e:TablaSimbolos = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }
}