// @ts-ignore
let errores = new Errores();
function analizarXpath(entornoGlobal) {
    const textoAnalizar = document.getElementById('inputXPath');
    const result = document.getElementById('result');
    // @ts-ignore
    let matrizConsultas = jisonXpaht.parse(textoAnalizar.value);
    if (errores.getSize > 0) {
        agregarContenidoErrores();
    }
    else {
        let i = 1;
        let resultConsulta = new Array();
        matrizConsultas.forEach(listC => {
            let entornos = [entornoGlobal];
            entornos = recorrer(listC, entornos, 0);
            entornos.forEach(e => {
                e.getTable().forEach(s => {
                    if (s instanceof Nodo) {
                        if (s.justShowTextOnly()) {
                            resultConsulta.push((i++) + ". " + s.toText());
                        }
                        else {
                            resultConsulta.push((i++) + ". " + s.toTag());
                        }
                    }
                });
            });
        });
        result.value = resultConsulta.join("\n");
    }
}
function recorrer(consultas, entornos, index) {
    let newEntornos = new Array();
    entornos = consultas[index].run(entornos);
    entornos.forEach((e) => {
        e.getTable().forEach((s) => {
            if (s instanceof Nodo) {
                if (s.getEntorno != null) {
                    let nuevoEntorno = s.getEntorno();
                    nuevoEntorno.setAnterior(e);
                    newEntornos.push(nuevoEntorno);
                }
            }
        });
    });
    index++;
    if (index < consultas.length) {
        entornos = (consultas[index] instanceof ConsultaSimple) ? newEntornos : entornos;
        return recorrer(consultas, entornos, index);
    }
    else {
        return entornos;
    }
}
