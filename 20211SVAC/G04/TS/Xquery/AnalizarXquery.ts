function analizarXquery() {
    const texto: HTMLTextAreaElement = document.getElementById('inputXPath') as HTMLTextAreaElement;
    //@ts-ignore
    analizadorXquery.parse(texto.value);
}