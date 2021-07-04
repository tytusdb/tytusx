class ConsultaText extends Consulta {
    run(entornos) {
        let newEntornos = new Array();
        entornos.forEach((e) => {
            let flag = false;
            let nuevoEntorno = new Entorno(e);
            e.getTable().forEach((s) => {
                if (s instanceof Nodo && !(s.getTexto() === "")) {
                    flag = true;
                    s.setShowTextOnly(true);
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
