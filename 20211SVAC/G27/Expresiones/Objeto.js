class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaObjetos) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
    }
    agregarObjeto(obj) {
        this.listaObjetos.push(obj);
    }
}