export class Atributo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    posicion: number;

    constructor(id:string, valor:string, linea:number, columna:number){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = -1;
    }
    getId() {
        return this.identificador;
    };

    getValor() {
        return this.valor;
    };

    setPosicion(pos){
        if(this.posicion==-1)this.posicion = pos;            
    };

    getPosicion(){
        return this.posicion;
    }
}