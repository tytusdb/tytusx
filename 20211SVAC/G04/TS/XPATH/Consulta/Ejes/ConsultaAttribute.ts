class ConsultaAttribute extends ConsultaSimple {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach(e => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                //Recorro los simbolos buscando el atributo
                if (s instanceof Atributo) {
                    if (super.getId() === "*") {
                        flag = this.addSimbolo(e, nuevoEntorno);
                    } else if (s.getNombre() == super.getId()) {
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

    private addSimbolo(e: Entorno, nuevoEntorno: Entorno): boolean {
        let flag = false;
        e.getAnterior().getTable().forEach((s: Simbolo) => {
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