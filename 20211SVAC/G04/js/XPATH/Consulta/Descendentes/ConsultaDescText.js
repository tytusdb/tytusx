class ConsultaDescText {
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
            if (s instanceof Nodo && !(s.getTexto() === "")) {
                flag = true;
                s.setShowTextOnly(true);
                nuevoEntorno.add(s);
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }
        e.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
