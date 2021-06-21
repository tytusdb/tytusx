class ConsultaPreceding {
    constructor(id) {
        this.id = id;
        this.ignorarNodos = true;
    }
    run(entornos) {
        let newEntornos = new Array();
        let ignoreNode;
        entornos[entornos.length - 1].getTable().reverse().forEach(s => {
            if (s instanceof Nodo) {
                if (ignoreNode == null) {
                    ignoreNode = s;
                }
            }
        });
        let entRaiz = entornos[entornos.length - 1];
        while (entRaiz.getAnterior() != null) {
            entRaiz = entRaiz.getAnterior();
        }
        entornos = [entRaiz];
        entornos.reverse().forEach(e => {
            this.busquedaDescendente(e, newEntornos, ignoreNode);
        });
        return newEntornos;
    }
    busquedaDescendente(entorno, newEntornos, ignoreNode) {
        let addEntorno = false;
        let nuevoEntorno = new Entorno(entorno.getAnterior());
        entorno.getTable().reverse().forEach(s => {
            if (s instanceof Nodo) {
                if (this.id === "*" && !this.ignorarNodos) {
                    addEntorno = true;
                    s.getEntorno().getTable().reverse();
                    nuevoEntorno.getTable().unshift(s);
                }
                if (s.getNombre() === this.id && !this.ignorarNodos) {
                    s.getEntorno().getTable().reverse();
                    addEntorno = true;
                    nuevoEntorno.getTable().unshift(s);
                }
                this.busquedaDescendente(s.getEntorno(), newEntornos, ignoreNode);
            }
            if (s === ignoreNode) {
                this.ignorarNodos = false;
            }
        });
        if (addEntorno) {
            newEntornos.unshift(nuevoEntorno);
        }
    }
}
