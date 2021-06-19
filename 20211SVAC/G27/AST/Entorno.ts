
class Entorno{
    private anterior:Entorno;
    private tabla:{[id:string] : Simbolo};

    constructor(anterior:any){
        this.tabla = {};
        this.anterior = anterior;
    }

    //agrega en la tabla de símbolos un nuevo símbolo.
    agregar(id:string, simbolo:Simbolo){
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.tabla[id] = simbolo;
    }

    //Se elimina un símbolo previamente almacenado
    eliminar(id:string):boolean{
        id = id.toLowerCase();
        for (let e:Entorno = this; e!= null; e = e.anterior)
        {
            const value = e.tabla[id];
            if (value !== undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    //Verifica si un símbolo ya existeen la tabla.
    existe(id:string):boolean{
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id];
            if (value !== undefined)
            {
                return true;
            }
        }
        return false;
    }

    //Busca en la tabla del entorno actual si ya existe el id del símbolo.
    existeEnactual(id:string):boolean{
        id = id.toLowerCase();
        if (this.tabla[id] !== undefined)
        {
            return true;
        }
        return false;
    }

    //Recorre los entornos y sus tablas existentes y busca el símbolo correspondiente al id.
    getSimbolo(id:string):any{
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            if (e.tabla[id] !== undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    //Reemplaza el valor de un simbolo existente en la tabla por un nuevo valor.
    reemplazar(id:string, nuevoValor:Simbolo){
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id];
            if (value !== undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }
}