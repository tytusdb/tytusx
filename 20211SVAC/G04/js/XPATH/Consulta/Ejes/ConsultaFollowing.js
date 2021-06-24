class ConsultaFollowing {
    constructor(id) {
        this.id = id;
        this.ignorarNodos = true;
    }
    run(entornos) {
        let newEntornos = new Array();
        let ignoreNode;
        entornos[0].getTable().forEach(s => {
            if (s instanceof Nodo) {
                if (ignoreNode == null) {
                    ignoreNode = s;
                }
            }
        });
        let entRaiz = entornos[0];
        while (entRaiz.getAnterior() != null) {
            entRaiz = entRaiz.getAnterior();
        }
        entornos = [entRaiz];
        entornos.forEach(e => {
            this.busquedaDescendente(e, newEntornos, ignoreNode);
        });
        return newEntornos;
    }
    busquedaDescendente(entorno, newEntornos, ignoreNode) {
        let addEntorno = false;
        let nuevoEntorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo) {
                if (this.id === "*" && !this.ignorarNodos) {
                    addEntorno = true;
                    nuevoEntorno.add(s);
                }
                if (s.getNombre() === this.id && !this.ignorarNodos) {
                    addEntorno = true;
                    nuevoEntorno.add(s);
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
        entorno.getTable().forEach(s => {
        });
    }
}
