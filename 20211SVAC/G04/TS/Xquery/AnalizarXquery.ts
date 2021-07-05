function analizarXquery() {
    const texto: HTMLTextAreaElement = document.getElementById('inputXPath') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('resultC3D')  as HTMLTextAreaElement;
    //@ts-ignore
    let resultado:object = analizadorXquery.parse(texto.value);
    console.log(resultado);
    let resultadoTexto = " ";
    //@ts-ignore
    resultado.instrucciones.forEach(e=>{
        console.log(e);
        if(e instanceof Expresion){
            let aux = "const consola = document.getElementById('result');"
            resultadoTexto += aux+"\n";
            resultadoTexto+= "consola.value = "+e.traspilar()+"\n";
        }else {
            resultadoTexto+= e.traspilar()+"\n";
        }
    });
    console.log(resultadoTexto);
    eval(resultadoTexto);
    //@ts-ignore
    agregarTablaVariables_Funciones(resultado.variables,resultado.funciones);

    //@ts-ignore
    let code = XqueryC3D.parse(texto.value);
    let controller: C3DController = new C3DController();
    consola.value = controller.generateC3DXquery(code.code, code.main, code.t);
}