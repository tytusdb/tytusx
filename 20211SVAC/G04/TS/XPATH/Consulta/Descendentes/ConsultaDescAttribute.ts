class ConsultaDescAttribute extends ConsultaSimple {

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
            if (s instanceof Atributo) {

                if (super.getIdentificador() === "*") {
                    flag = this.addSimbolo(entorno, nuevoEntorno);
                } else if (s.getNombre() === super.getIdentificador()) {
                    flag = this.addSimbolo(entorno, nuevoEntorno);
                }
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

    private addSimbolo(entorno: Entorno, nuevoEntorno: Entorno): boolean {
        let flag: boolean = false;
        entorno.getAnterior().getTable().forEach((s: Simbolo) => {
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