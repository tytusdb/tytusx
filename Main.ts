function testTS(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputText') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('areaInfo')  as HTMLTextAreaElement;

    // @ts-ignore
    let result = AnalyzerXML.parse(texto.value);
    consola.value = result;
}