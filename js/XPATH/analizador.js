// @ts-ignore
let errores = new Errores();
let consultas = new Array();
function analizarXpath(entornoGlobal) {
    const textoAnalizar = document.getElementById('inputXPath');
    const result = document.getElementById('result');
    // @ts-ignore
    jisonXpaht.parse(textoAnalizar.value);
    if (errores.getSize > 0) {
        agregarContenidoErrores();
    }
    else {
        let entornos = [entornoGlobal];
        entornos = recorrer(consultas, entornos, 0);
        let resultConsulta = new Array();
        let i = 1;
        entornos.forEach(e => {
            e.getTable().forEach(s => {
                if (!(s instanceof Atributo)) {
                    resultConsulta.push((i++) + ". " + s.toTag());
                }
            });
        });
        result.value = resultConsulta.join("\n");
    }
    consultas = new Array();
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
