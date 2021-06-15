class ConsultaDescAttr extends ConsultaSimple {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            this.busquedaDescendente(e, newEntornos);
        });
        return newEntornos;
    }
    busquedaDescendente(entorno, newEntornos) {
        let flag = false;
        let nuevoEntorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach((s) => {
            //Recorro los simbolos buscando el atributo
            if (s.getNombre() == super.getIdentificador() && s instanceof Atributo) {
                //recorro los simbolos de el entorno anterior
                entorno.getAnterior().getTable().forEach((s) => {
                    if (s instanceof Nodo) {
                        //Si el el entorno del nodo actual es igual al entorno del atributo lo agergo al nuevo entorno
                        if (s.getEntorno() == entorno) {
                            flag = true;
                            nuevoEntorno.add(s);
                        }
                    }
                });
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
