export class Html {
    constructor(identifier, atributos, texto, listaHtml, listaVarCall, isUnica, linea, columna) {
        this.linea = linea;
        this.listaVarCall = listaVarCall;
        this.columna = columna;
        this.isUnica = isUnica;
        this.identifier = identifier;
        this.listaHtml = listaHtml;
        this.atributos = atributos;
        this.texto = texto;
    }
    ejecutar(ent) {
    }
}
