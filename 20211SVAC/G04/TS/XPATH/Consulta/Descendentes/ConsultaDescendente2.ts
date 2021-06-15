class ConsultaDescendente2 extends ConsultaSimple {

    run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {
            this.busquedaDescendente(e, newEntornos);
        });

        return newEntornos;
    }

    private busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>) {
        let flag: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach(s => {
            if (s instanceof Nodo && s.getNombre() === super.getIdentificador()) {
                flag = true;
                nuevoEntorno.add(s);
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }

        entorno.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
