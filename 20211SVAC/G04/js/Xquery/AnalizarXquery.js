function analizarXquery() {
    const texto = document.getElementById('inputXPath');
    const consola = document.getElementById('resultC3D');
    //@ts-ignore
    analizadorXquery.parse(texto.value);
    //@ts-ignore
    let code = XqueryC3D.parse(texto.value);
    let controller = new C3DController();
    consola.value = controller.generateC3DXquery(code.code, code.main, code.t);
}
