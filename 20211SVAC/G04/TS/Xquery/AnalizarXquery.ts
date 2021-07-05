function analizarXquery() {
    const texto: HTMLTextAreaElement = document.getElementById('inputXPath') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('resultC3D')  as HTMLTextAreaElement;
    //@ts-ignore
    analizadorXquery.parse(texto.value);
    //@ts-ignore
    let code = XqueryC3D.parse(texto.value);
    let controller: C3DController = new C3DController();
    consola.value = controller.generateC3DXquery(code.code, code.main, code.t);

}