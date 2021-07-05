class ConsultaDescNode extends Consulta {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            this.busquedaDescendente(e, newEntornos);
        });
        return newEntornos;
    }
    busquedaDescendente(e, newEntornos) {
        let flag = false;
        let nuevoEntorno = new Entorno(e);
        e.getTable().forEach((s) => {
            if (s instanceof Nodo) {
                if (!(s.getTexto() === "")) {
                    flag = true;
                    let nodeTemp = new Nodo(s.getTexto(), s.getEntorno());
                    nuevoEntorno.add(nodeTemp);
                }
                s.getEntorno().getTable().forEach(ss => {
                    if (ss instanceof Nodo) {
                        flag = true;
                        nuevoEntorno.add(ss);
                    }
                });
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }
        e.getTable().forEach((s) => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
