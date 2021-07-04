class ConsultaSimple extends Consulta {
    constructor(...args) {
        if (args.length === 3) {
            super(args[0], args[1], args[2]);
            return;
        }
        if (args.length === 4) {
            super(args[0], args[1], args[2]);
            this.isDescendant = args[3];
            return;
        }
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            this.busqueda(e, newEntornos);
        });
        super.getFiltros().forEach(f => { newEntornos = f.filtrar(newEntornos); });
        return newEntornos;
    }
    busqueda(e, newEntornos) {
        e.getTable().forEach((s) => {
            if (s instanceof Nodo) {
                if (super.getId() === "*") {
                    this.addEntorno(newEntornos, e, s);
                }
                else if (s.getNombre() == super.getId()) {
                    this.addEntorno(newEntornos, e, s);
                }
                if (this.isDescendant) {
                    this.busqueda(s.getEntorno(), newEntornos);
                }
            }
        });
    }
    addEntorno(entornos, anterior, simbolo) {
        let nuevoEntorno = new Entorno(anterior.getAnterior());
        nuevoEntorno.add(simbolo);
        entornos.push(nuevoEntorno);
    }
}
