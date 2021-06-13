var EntradaXPath = CodeMirror.fromTextArea
(document.getElementById('entrada_xpath'),{
    mode: "text/x-java",
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true
});

//EntradaXPath.setSize(850, 250);
EntradaXPath.refresh();

var SalidaXPath = CodeMirror.fromTextArea
(document.getElementById('salida_xpath'),{
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true,
    readOnly: true,
    readOnly: "nocursor"
});

//SalidaXPath.setSize(850, 475);
SalidaXPath.refresh();
