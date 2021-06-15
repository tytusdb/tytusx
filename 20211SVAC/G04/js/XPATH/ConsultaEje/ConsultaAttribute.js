class ConsultaAttribute {
    run(entornos, id) {
        let newEntornos = new Array();
        entornos = this.getEntornosHijos(entornos);
        entornos.forEach(e => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                //Recorro los simbolos buscando el atributo
                if (s instanceof Atributo) {
                    if (id === "*") {
                        e.getAnterior().getTable().forEach((s) => {
                            if (s instanceof Nodo) {
                                //Si el el entorno del nodo actual es igual al entorno del atributo lo agergo al nuevo entorno
                                if (s.getEntorno() == e) {
                                    flag = true;
                                    nuevoEntorno.add(s);
                                }
                            }
                        });
                    }
                    else if (s.getNombre() == id) {
                        e.getAnterior().getTable().forEach((s) => {
                            if (s instanceof Nodo) {
                                //Si el el entorno del nodo actual es igual al entorno del atributo lo agergo al nuevo entorno
                                if (s.getEntorno() == e) {
                                    flag = true;
                                    nuevoEntorno.add(s);
                                }
                            }
                        });
                    }
                }
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
    getEntornosHijos(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    if (s.getEntorno != null) {
                        let nuevoEntorno = s.getEntorno();
                        nuevoEntorno.setAnterior(e);
                        newEntornos.push(nuevoEntorno);
                    }
                }
            });
        });
        return newEntornos;
    }
}
