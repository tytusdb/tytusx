class ConsultaDescText extends Consulta {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach((e: Entorno) => {
            this.busquedaDescendente(e, newEntornos);
        });

        return newEntornos;
    }

    private busquedaDescendente(e: Entorno, newEntornos: Array<Entorno>) {
        let flag: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(e);
        e.getTable().forEach((s: Simbolo) => {
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