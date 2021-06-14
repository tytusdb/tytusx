class ConsultaDescendente extends ConsultaSimple {
    run(entornosEntrada) {
        let entornos = new Array();
        let aux = new Array();
        let er = false;
        entornosEntrada.forEach((e) => {
            e.getTable().forEach((s) => {
                if (s instanceof Nodo) {
                    this.visitarHijos(s.getEntorno(), entornos);
                }
                if (entornos.length == 0 && s.getNombre() == super.getIdentificador()) {
                    let entornonuevo = new Entorno(e);
                    entornonuevo.add(s);
                    aux.push(entornonuevo);
                }
            });
        });
        if (aux.length > 0)
            entornos = aux;
        return entornos;
    }
    visitarHijos(entornoEntrada, aux) {
        entornoEntrada.getTable().forEach((e) => {
            if (e instanceof Nodo) {
                if (e.getNombre() == super.getIdentificador()) {
                    let salida = new Entorno(entornoEntrada);
                    salida.add(e);
                    aux.push(salida);
                }
                else {
                    this.visitarHijos(e.getEntorno(), aux);
                }
            }
        });
        return aux;
    }
}
