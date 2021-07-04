class ConsultaDescAttribute extends ConsultaSimple {
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
            if (s instanceof Atributo) {
                if (super.getId() === "*") {
                    flag = this.addSimbolo(entorno, nuevoEntorno);
                }
                else if (s.getNombre() === super.getId()) {
                    flag = this.addSimbolo(entorno, nuevoEntorno);
                }
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
    addSimbolo(entorno, nuevoEntorno) {
        let flag = false;
        entorno.getAnterior().getTable().forEach((s) => {
            if (s instanceof Nodo) {
                if (s.getEntorno() == entorno) {
                    flag = true;
                    nuevoEntorno.add(s);
                }
            }
        });
        return flag;
    }
}
