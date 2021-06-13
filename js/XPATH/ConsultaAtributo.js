class ConsultaAtributo extends ConsultaSimple {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s) => {
                //Recorro los simbolos buscando el atributo
                if (s.getNombre() == super.getIdentificador() && s instanceof Atributo) {
                    //recorro los simbolos de el entorno anterior
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
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });
        return newEntornos;
    }
    addEntorno(entornos, entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}
