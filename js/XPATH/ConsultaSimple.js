class ConsultaSimple {
    constructor(id) {
        this.identificador = id;
    }
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                if (s.getNombre() == this.identificador && s instanceof Nodo) {
                    flag = true;
                    nuevoEntorno.add(s);
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
    getIdentificador() {
        return this.identificador;
    }
}
