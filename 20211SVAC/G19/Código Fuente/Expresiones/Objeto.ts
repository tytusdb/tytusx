


class Objeto{
    id:string;
    texto:string;
    listaAtributos:Array<any>;
    listaObjetos: Array<any>;
    linea: number;
    columna: number;
    entorno: Entorno;
    EtiquetaCierre:string;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<any>, listaObjetos:Array<any>,EtiquetaCierre:string){
        this.id = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos
        this.entorno = new Entorno(null);
        this.EtiquetaCierre=EtiquetaCierre;
    }
    getId() {
        return this.id;
    }
    getTexto() {
        return this.texto;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    getListaObjetos() {
        return this.listaObjetos;
    }
    getListaAtributo() {
        return this.listaAtributos;
    }
    getEtiquetaCierre(){
        return this.EtiquetaCierre;
    }
}