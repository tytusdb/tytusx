var textA = document.getElementById("editor");
var editor = CodeMirror.fromTextArea(textA, {
    lineNumbers: true,
    mode: "text/html",
    matchBrackets: true
});




var textXQ = document.getElementById("consola");
var editorXQ = CodeMirror.fromTextArea(textXQ, {
    mode: "xquery",
    lineWrapping: true,
    lineNumbers: true,
    theme: "blackboard"
});

var textA3d = document.getElementById("cod3d");
var editor3d = CodeMirror.fromTextArea(textA3d, {
    mode: "text/html",
    lineWrapping: true,
    lineNumbers: true,
    theme: "blackboard"
});

var resultado1 = document.getElementById("resultado");
var editorRes = CodeMirror.fromTextArea(resultado1, {
    mode: "text/html",
    lineWrapping: true,
    lineNumbers: true,
    theme: "blackboard"
});
