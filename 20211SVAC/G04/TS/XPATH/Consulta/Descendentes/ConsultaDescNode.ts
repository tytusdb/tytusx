class ConsultaDescNode implements Consulta {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach((e: Entorno) => {
            this.busquedaDescendente(e, newEntornos);
        });

        return newEntornos;
    }

    public busquedaDescendente(e: Entorno, newEntornos: Array<Entorno>) {
        let flag: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(e);

        e.getTable().forEach((s: Simbolo) => {
            if (s instanceof Nodo) {
                if (!(s.getTexto() === "")) {
                    flag = true;
                    let nodeTemp: Nodo = new Nodo(s.getTexto(), s.getEntorno());
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

        e.getTable().forEach((s: Simbolo) => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}