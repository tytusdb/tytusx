class ConsultaDescAllNodes extends ConsultaSimple {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => this.busquedaDescendente(e, newEntornos));

        return  newEntornos;
    }

    private busquedaDescendente(e: Entorno, newEntornos: Array<Entorno>) {
        newEntornos.push(e);

        e.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}