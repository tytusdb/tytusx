function analizarXquery() {
    const texto = document.getElementById('inputXPath');
    //@ts-ignore
    analizadorXquery.parse(texto.value);
}
