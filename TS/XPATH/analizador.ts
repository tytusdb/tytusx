// @ts-ignore
let errores = new Errores();
function analizarXpath(entornoGlobal: Entorno){
    const textoAnalizar = document.getElementById('inputXPath');
    const result = document.getElementById('result') as HTMLTextAreaElement;
    // @ts-ignore
    let matrizConsultas: Array<Array<Consulta>> = jisonXpaht.parse(textoAnalizar.value);
    let encabezadoErrores = ["Tipo","Descripcion","Linea","Columna"];

    if (errores.getSize > 0) {
        tablaEcabezado(encabezadoErrores);
        agregarContenidoErrores();
    } else {
        let i: number = 1;
        let resultConsulta: Array<string> = new Array();
        matrizConsultas.forEach(listC => {
            let entornos: Array<Entorno> = [entornoGlobal];
            entornos = recorrer(listC, entornos, 0);

            entornos.forEach(e => {
                e.getTable().forEach(s => {
                    if (s instanceof Nodo) {
                        if (s.justShowTextOnly()) {
                            resultConsulta.push((i++) + ". " + s.toText());
                        } else {
                            resultConsulta.push((i++) + ". " + s.toTag());
                        }
                    }
                });
            });
        });
        result.value = resultConsulta.join("\n");


    }
}

function recorrer(consultas: Array<Consulta>, entornos: Array<Entorno>, index: number): Array<Entorno> {

    let newEntornos: Array<Entorno> = new Array();
    entornos = consultas[index].run(entornos);
    entornos.forEach((e: Entorno) => {
        e.getTable().forEach((s: Simbolo) => {
            if (s instanceof Nodo) {
                if ((s as Nodo).getEntorno != null) {
                    let nuevoEntorno: Entorno = (<Nodo>s).getEntorno();
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
    } else {
        return entornos;
    }
}