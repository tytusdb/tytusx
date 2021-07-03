class ConsultaPrecSibling {
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
        let parent = new ConsultaPuntos();
        entornos = parent.run(entornos);
        entornos = this.getHijos(entornos);
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (this.id === "*" && !this.ignorarNodos) {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                    else if (s.getNombre() == this.id && !this.ignorarNodos) {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                    if (s === ignoreNode) {
                        this.ignorarNodos = false;
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
    getHijos(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (s.getEntorno != null) {
                        let nuevoEntorno = s.getEntorno();
                        nuevoEntorno.setAnterior(e);
                        newEntornos.push(nuevoEntorno);
                    }
                }
            });
        });
        return newEntornos;
    }
}
