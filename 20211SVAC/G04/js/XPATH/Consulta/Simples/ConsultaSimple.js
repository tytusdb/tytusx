class ConsultaSimple extends Consulta {
    constructor(type, id) {
        super(type, id);
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (super.getId() === "*") {
                        nuevoEntorno.add(s);
                    }
                    else if (s.getNombre() == super.getId()) {
                        nuevoEntorno.add(s);
                    }
                }
            });
            if (nuevoEntorno.getTable().length > 0) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
}
