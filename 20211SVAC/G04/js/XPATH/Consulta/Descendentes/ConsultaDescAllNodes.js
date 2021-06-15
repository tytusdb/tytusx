class ConsultaDescAllNodes extends ConsultaSimple {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => this.busquedaDescendente(e, newEntornos));
        return newEntornos;
    }
    busquedaDescendente(e, newEntornos) {
        newEntornos.push(e);
        e.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
