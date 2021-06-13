// @ts-ignore
let errores = new Errores();
function analizarXpath(entornoGlobal) {
    const textoAnalizar = document.getElementById('inputXPath');
    const result = document.getElementById('result');
    // @ts-ignore
    let matrizConsultas = jisonXpaht.parse(textoAnalizar.value);
    let encabezadoErrores = ["Tipo", "Descripcion", "Linea", "Columna"];
    if (errores.getSize > 0) {
        tablaEcabezado(encabezadoErrores);
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
                    if (!(s instanceof Atributo)) {
                        resultConsulta.push((i++) + ". " + s.toTag());
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
                    newEntornos.push(s.getEntorno());
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
