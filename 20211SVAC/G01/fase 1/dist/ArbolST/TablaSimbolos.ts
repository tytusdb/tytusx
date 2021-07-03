export class Elemento_tabla{
    constructor(public nombre : string, private ambito : string, private tipo : string, private fila : number, private columna : number){}

    public setNombre(nombre : string){
        this.nombre = nombre;
    }

    public setAmbito(ambito : string){
        this.ambito = ambito;
    }

    public setTipo(tipo : string){
        this.tipo = tipo;
    }

    public setFila(fila : number){
        this.fila = fila;
    }

    public setColumna(columna : number){
        this.columna;
    }
}

export let tabla_simbolos : Array<Elemento_tabla> = new Array();