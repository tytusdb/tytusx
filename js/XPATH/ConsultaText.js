class ConsultaText {
    run(entornos) {
        let newEntornos = new Array();
        console.log(entornos);
        entornos.forEach((e) => {
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
        });
        return newEntornos;
    }
}
