

export class Objeto{
    identificador:any;
    texto:any;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;

    constructor(id:any, texto:any, linea:number, columna:number, listaO:Array<Objeto>){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaObjetos = listaO
    }
}