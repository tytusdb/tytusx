class ConsultaAttribute {

    public run(entornos: Array<Entorno>, id: string): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos = this.getEntornosHijos(entornos);
        entornos.forEach(e => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                //Recorro los simbolos buscando el atributo
                if (s instanceof Atributo) {
                    if (id === "*") {
                        e.getAnterior().getTable().forEach((s: Simbolo) => {
                            if (s instanceof Nodo) {
                                //Si el el entorno del nodo actual es igual al entorno del atributo lo agergo al nuevo entorno
                                if (s.getEntorno() == e) {
                                    flag = true;
                                    nuevoEntorno.add(s);
                                }
                            }
                        });
                    }else if (s.getNombre() == id) {
                        e.getAnterior().getTable().forEach((s: Simbolo) => {
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

    private getEntornosHijos(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();
        entornos.forEach((e: Entorno) => {
            e.getTable().forEach((s: Simbolo) => {
                if (s instanceof Nodo) {
                    if ((s as Nodo).getEntorno != null) {
                        let nuevoEntorno: Entorno = (<Nodo>s).getEntorno();
                        nuevoEntorno.setAnterior(e);
                        newEntornos.push(nuevoEntorno);
                    }
                }
            });
        });

        return newEntornos;
    }
}