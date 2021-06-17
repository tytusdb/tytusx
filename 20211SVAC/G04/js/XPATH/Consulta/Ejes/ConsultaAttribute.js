class ConsultaAttribute extends ConsultaSimple {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach(e => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                //Recorro los simbolos buscando el atributo
                if (s instanceof Atributo) {
                    if (super.getIdentificador() === "*") {
                        flag = this.addSimbolo(e, nuevoEntorno);
                    }
                    else if (s.getNombre() == super.getIdentificador()) {
                        flag = this.addSimbolo(e, nuevoEntorno);
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
    addSimbolo(e, nuevoEntorno) {
        let flag = false;
        e.getAnterior().getTable().forEach((s) => {
            if (s instanceof Nodo) {
                //Si el el entorno del nodo actual es igual al entorno del atributo lo agergo al nuevo entorno
                if (s.getEntorno() == e) {
                    flag = true;
                    nuevoEntorno.add(s);
                }
            }
        });
        return flag;
    }
}
