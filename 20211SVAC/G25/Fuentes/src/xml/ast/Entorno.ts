class Entorno {
    private anterior: Entorno;
    private tabla:{[id:string]: Simbolo};
    private unique: number;

    constructor(anterior: any) {
        this.anterior = anterior;
        this.tabla = {};
        this.unique = 0;
    }

    agregar(simbolo:Simbolo) {
        simbolo.id = simbolo.id.toLowerCase();
        this.tabla[this.unique] = simbolo;
        this.unique++;
    }

    existe(id:string):boolean {
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if(value!==undefined) {
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

    getSimbolo(id:string):any {
        id = id.toLowerCase();
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    getTabla():any {
        return this.tabla;
    }

    getAnterior():any {
        return this.anterior;
    }

}