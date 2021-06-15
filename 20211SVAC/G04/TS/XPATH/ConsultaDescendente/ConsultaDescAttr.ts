class ConsultaDescAttr extends ConsultaSimple {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach((e: Entorno) => {
            this.busquedaDescendente(e, newEntornos);
        });

        return newEntornos;
    }

    private busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>) {
        let flag: boolean = false;
        let nuevoEntorno: Entorno = new Entorno(entorno.getAnterior());
        entorno.getTable().forEach((s: Simbolo) => {
            //Recorro los simbolos buscando el atributo
            if (s.getNombre() == super.getIdentificador() && s instanceof Atributo) {
                //recorro los simbolos de el entorno anterior
                entorno.getAnterior().getTable().forEach((s: Simbolo) => {
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

        entorno.getTable().forEach (s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}