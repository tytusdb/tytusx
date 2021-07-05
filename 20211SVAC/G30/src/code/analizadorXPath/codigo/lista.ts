export class xpathC3D{

    listaInstrucciones: Array<Instruccion>;

    constructor(){
        this.listaInstrucciones = [];
    }

}

export class Instruccion {
    tipo: string;
    cadena: string;

    constructor (tipo: string, cadena:string ) {
        this.tipo = tipo;
        this.cadena = cadena;
    }


    public getTipo(){
        return this.tipo;
    }

    public getCadena(){
        return this.cadena;
    }
}