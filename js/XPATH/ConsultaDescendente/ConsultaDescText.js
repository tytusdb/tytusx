class ConsultaDescText {
    run(entornos) {
        let newEntornos = new Array();
        console.log(entornos);
        entornos.forEach((e) => {
            this.busquedaDescendente(e, newEntornos);
        });
        return newEntornos;
    }
    busquedaDescendente(e, newEntornos) {
        let flag = false;
        let nuevoEntorno = new Entorno(e);
        e.getTable().forEach((s) => {
            //Recorro los simbolos viendo si tienen texto
            if (s instanceof Nodo && !(s.getTexto() === "")) {
                //recorro los simbolos de el entorno anterior
                flag = true;
                nuevoEntorno.add(s);
            }
        });
        if (flag) {
            newEntornos.push(nuevoEntorno);
        }
        e.getTable().forEach(s => {
            if (s instanceof Nodo) {
                this.busquedaDescendente(s.getEntorno(), newEntornos);
            }
        });
    }
}
