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
    toTag() {
        let etiqueta = new Array();
        if (super.getType() === Type.DOUBLE_TAG) {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + ">");
            etiqueta.push(this.texto);
            etiqueta.push(this.nodesToTag(this.entorno));
            etiqueta.push("</" + super.getNombre() + ">");
        }
        else {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + "/>");
        }
        return etiqueta.join("");
    }
    attribsToText() {
        let attribText = new Array();
        this.atributos.forEach(a => {
            attribText.push(" " + a.getNombre() + "=\"" + a.getValor() + "\"");
        });
        return attribText.join("");
    }
    nodesToTag(entorno) {
        let nodosText = new Array();
        entorno.getTable().forEach(n => {
            if (n instanceof Nodo) {
                nodosText.push("\n" + n.toTag());
            }
        });
        return nodosText.join("");
    }
}
