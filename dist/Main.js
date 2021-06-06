function testTS() {
    const texto = document.getElementById('inputText');
    const consola = document.getElementById('areaInfo');
    // @ts-ignore
    let result = AnalyzerXML.parse(texto.value);
    consola.value = result;
}
