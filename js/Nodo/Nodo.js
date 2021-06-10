class Nodo extends Simbolo {
    constructor($nombre, $atributos, $nodos, type, $texto, $linea, $columna) {
        super($nombre, type, $linea, $columna);
        this.atributos = $atributos;
        this.nodos = $nodos;
        this.texto = $texto;
    }
    getAtributos() {
        return this.atributos;
    }
    setAtributos(atributos) {
        this.atributos = atributos;
    }
    getNodos() {
        return this.nodos;
    }
    setNodos(nodos) {
        this.nodos = nodos;
    }
    getTexto() {
        return this.texto;
    }
    setTexto(texto) {
        this.texto = texto;
    }
    getValorImplicito() {
        return this.texto;
    }
    getEntorno() {
        return this.entorno;
    }
    setEntorno(entorno) {
        this.entorno = entorno;
    }
}
