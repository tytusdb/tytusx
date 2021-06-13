class ConsultaAtributo extends ConsultaSimple {

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        entornos.forEach((e: Entorno) => {
            let flag: boolean = false;
            let nuevoEntorno: Entorno = new Entorno(e.getAnterior());
            e.getTable().forEach((s: Simbolo) => {
                //Recorro los simbolos buscando el atributo
                if (s.getNombre() == super.getIdentificador() && s instanceof Atributo) {
                    //recorro los simbolos de el entorno anterior
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
            });
            if (flag) {
                newEntornos.push(nuevoEntorno);
            }
        });

        return newEntornos;
    }

    private addEntorno(entornos: Array<Entorno>, entorno: Entorno) {
        if (entornos.find(e => e === entorno) == undefined) {
            entornos.push(entorno);
        }
    }
}