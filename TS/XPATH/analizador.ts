// @ts-ignore
let errores = new Errores();
let consultas: Array<Consulta> = new Array();
function analizarXpath(entornoGlobal: Entorno){
    const textoAnalizar = document.getElementById('inputXPath');
    const result = document.getElementById('result') as HTMLTextAreaElement;
    // @ts-ignore
    jisonXpaht.parse(textoAnalizar.value);
    let encabezadoErrores = ["Tipo","Descripcion","Linea","Columna"];

    if (errores.getSize > 0) {
        tablaEcabezado(encabezadoErrores);
        agregarContenidoErrores();
    } else {
        let entornos: Array<Entorno> = [entornoGlobal];
        entornos = recorrer(consultas, entornos, 0);

        let resultConsulta: Array<string> = new Array();
        let i: number = 1;
        entornos.forEach(e => {
            e.getTable().forEach(s => {
                if (!(s instanceof Atributo)) {
                    resultConsulta.push((i++) + ". " + (<Nodo>s).toTag());
                }
            });
        });
        result.value = resultConsulta.join("\n");
    }
    consultas = new Array();
}

function recorrer(consultas: Array<Consulta>, entornos: Array<Entorno>, index: number): Array<Entorno> {

    let newEntornos: Array<Entorno> = new Array();
    entornos = consultas[index].run(entornos);
    entornos.forEach((e: Entorno) => {
        e.getTable().forEach((s: Simbolo) => {
            if (s instanceof Nodo) {
                if ((s as Nodo).getEntorno != null) {
                    newEntornos.push((s as Nodo).getEntorno());
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