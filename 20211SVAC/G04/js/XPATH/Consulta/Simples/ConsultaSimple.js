class ConsultaSimple extends Consulta {
    constructor(type, id) {
        super(type, id);
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (super.getId() === "*") {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                    else if (s.getNombre() == super.getId()) {
                        flag = true;
                        nuevoEntorno.add(s);
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
}
