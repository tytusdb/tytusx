/* codemirror para textarea de XQUERY */
var code2 = document.getElementById("EntradaXQuery");
var editor2 = CodeMirror.fromTextArea(code2, {
    height: "350px;",
        mode: "text/x-sql",
        lineNumbers: true
});

function showCodeXQuery(){
    var text = editor2.getValue();
    return text;
}

