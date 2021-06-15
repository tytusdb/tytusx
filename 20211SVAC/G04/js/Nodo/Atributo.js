class Atributo extends Simbolo {
    constructor($nombre, $valor, type, $linea, $columna) {
        super($nombre, type, $linea, $columna);
        this.valor = $valor;
    }
    getValor() {
        return this.valor;
    }
    getValorImplicito() {
        return this.valor;
    }
}
