let erroresXpath = new Errores();
function analizarXpath(entornoGlobal: Entorno, resultC3D: C3DResult) {
    erroresXpath = new Errores();
    const textoAnalizar = document.getElementById('inputXPath');
    const consola: HTMLTextAreaElement = document.getElementById('resultC3D')  as HTMLTextAreaElement;
    const result = document.getElementById('result') as HTMLTextAreaElement;
    let matrizConsultas: Array<Array<Consulta>>;
    try {
        // @ts-ignore
        matrizConsultas = jisonXpaht.parse(textoAnalizar.value);
    } catch (err) {
        erroresXpath.agregarError("Error fatal", "error sin recuperacion", 0, 0);
        matrizConsultas = [];
    }

    if (erroresXpath.getSize > 0) {
        if (erroresXpath.getErrores().length > 0) {
            erroresXpath.agregarEncabezado("<br>XML");
            erroresXpath.getErrores().forEach(e => {
                errores.agregarError1(e);
            });
            matrizConsultas = [];
        }
    }
    if(errores.getErrores().length>0){
        agregarContenidoErrores();
    }
        let i: number = 1;
        let resultConsulta: Array<string> = new Array();
        matrizConsultas.forEach(listC => {
            let entornos: Array<Entorno> = [entornoGlobal];
            entornos = recorrerConsultas(listC, entornos, 0);

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
        consola.value = generateC3D(resultC3D, matrizConsultas);
}

function recorrerConsultas(consultas: Array<Consulta>, entornos: Array<Entorno>, index: number): Array<Entorno> {

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
        return recorrerConsultas(consultas, entornos, index);
    } else {
        return entornos;
    }
}

function generateC3D(result: C3DResult, matriz: Array<Array<Consulta>>): string {
    result = generarC3DConsultas(result, matriz);

    let codigo: Array<string> = new Array();
    codigo.push("/*------HEADER------*/");
    codigo.push("#include <stdio.h>");
    codigo.push("#include <math.h>");
    codigo.push("double heap[30101999];");
    codigo.push("double stack[30101999];");
    codigo.push("double P;");
    codigo.push("double H;");

    let aux: Array<string> = new Array();
    aux.push("double");
    for (let i = 0; i < result.getNextTemp(); i++) {
        aux.push(` t${i}`);
        aux.push(",");
    }
    aux.pop();
    aux.push(";");
    codigo.push(aux.join(""));

    codigo.push("\n/*-----MAIN-----*/");
    codigo.push("void main() {");
    codigo.push("\tP = 0; H = 0;");

    result.getCodigo().forEach(l => codigo.push(l));

    codigo.push("\treturn;");
    codigo.push("}");

    return codigo.join("\n");
}

function generarC3DConsultas(result: C3DResult, matriz: Array<Array<Consulta>>): C3DResult {

    matriz[0].forEach(c => {
        result = c.generateC3D(result);
    });

    let codigo: Array<string> = result.getCodigo();
    let i: number = result.getNextTemp();
    let p: number = result.getSp();

    codigo.push(`\n\t//C3D Arreglo de consultas`);
    codigo.push(`\tt${i} = H;`);
    codigo.push(`\tt${i+1} = t${i} + 1;`);
    codigo.push(`\theap[(int)H] = ${matriz[0].length};`);
    codigo.push(`\tH = H + ${matriz[0].length + 1};`);

    let iTemp: number = i+1;
    matriz[0].forEach(c => {
        codigo.push(`\n\tt${iTemp+1} = stack[(int)${c.getStackPointer()}];`);
        codigo.push(`\theap[(int)t${i+1}] = t${iTemp+1};`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);
        iTemp++;
    });
    iTemp++;

    codigo.push(`\tstack[(int)${p++}] = t${i};`);

    result.setNextTemp(iTemp);
    result.setSp(p);
    result.setCodigo(codigo);

    return result;
}
