class Nodo extends Simbolo {
    constructor(...args) {
        if (args.length === 7) {
            super(args[0], args[3], args[5], args[6]);
            this.atributos = args[1];
            this.nodos = args[2];
            this.texto = args[4];
            this.showTextOnly = false;
            return;
        }
        if (args.length === 2) {
            super(null, null, null, null);
            this.texto = args[0];
            this.entorno = args[1];
            this.showTextOnly = true;
            return;
        }
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
    setShowTextOnly(flag) {
        this.showTextOnly = flag;
    }
    justShowTextOnly() {
        return this.showTextOnly;
    }
    toText() {
        return this.texto;
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
