var EntradaXPath = CodeMirror.fromTextArea
(document.getElementById('entrada_xpath'),{
    mode: "text/x-java",
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true
});

EntradaXPath.setSize(null, 130);
EntradaXPath.refresh();

var SalidaXPath = CodeMirror.fromTextArea
(document.getElementById('salida_xpath'),{
    mode : "text/html",
    htmlMode: true,
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true,
    readOnly: true,
    readOnly: "nocursor"
});

SalidaXPath.setSize(null, 600);
SalidaXPath.refresh();
