function analizarXquery() {
    const texto = document.getElementById('inputXPath');
    const consola = document.getElementById('resultC3D');
    //@ts-ignore
    let resultado = analizadorXquery.parse(texto.value);
    console.log(resultado);
    let resultadoTexto = " ";
    //@ts-ignore
    resultado.instrucciones.forEach(e => {
        console.log(e);
        if (e instanceof Expresion) {
            let aux = "const consola = document.getElementById('result');";
            resultadoTexto += aux + "\n";
            resultadoTexto += "consola.value = " + e.traspilar() + "\n";
        }
        else {
            resultadoTexto += e.traspilar() + "\n";
        }
    });
    console.log(resultadoTexto);
    eval(resultadoTexto);
    //@ts-ignore
    agregarTablaVariables_Funciones(resultado.variables, resultado.funciones);
    //@ts-ignore
    let code = XqueryC3D.parse(texto.value);
    let controller = new C3DController();
    consola.value = controller.generateC3DXquery(code.code, code.main, code.t);
}
