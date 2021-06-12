var tab = 1;

var editor = CodeMirror.fromTextArea
(document.getElementById('editor'),{
    mode : "text/html",
    htmlMode: true,
    theme: "cobalt",
    lineNumbers: true,
    fixedGutter: false,
    autoRefresh:true
});

editor.setSize(850, 650);
editor.refresh();

var editor2 = CodeMirror.fromTextArea
(document.getElementById('editor2'),{
    mode : "text/html",
    htmlMode: true,
    theme: "cobalt",
    lineNumbers: true,
    fixedGutter: false,
    autoRefresh:true
});

editor2.setSize(850, 650);
editor2.refresh();

var editor3 = CodeMirror.fromTextArea
(document.getElementById('editor3'),{
    mode : "text/html",
    htmlMode: true,
    theme: "cobalt",
    lineNumbers: true,
    fixedGutter: false,
    autoRefresh:true
});

editor3.setSize(850, 650);
editor3.refresh();

var editor4 = CodeMirror.fromTextArea
(document.getElementById('editor4'),{
    mode : "text/html",
    htmlMode: true,
    theme: "cobalt",
    lineNumbers: true,
    fixedGutter: false,
    autoRefresh:true
});

editor4.setSize(850, 650);
editor4.refresh();

function SetearUno(){
    tab = 1;
}

function SetearDos(){
    tab = 2;
}

function SetearTres(){
    tab = 3;
}

function SetearCuatro(){
    tab = 4;
}


const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("botonAbrir");

customBtn.addEventListener("click", function() {
    realFileBtn.click();
  });
  
realFileBtn.addEventListener("change", function() {
    if (this.files && this.files[0]) {
        var myFile = this.files[0];
        var reader = new FileReader();

        reader.fileName = myFile.name;
        reader.addEventListener('load', function (e) {
            var contenido = e.target.result.toString();
            if(tab==1){
                editor.setValue(contenido);
            } else if(tab==2){
                editor2.setValue(e.target.result);
            } else if(tab==3){
                editor3.setValue(e.target.result);
            } else if(tab==4){
                editor4.setValue(e.target.result);
            }
        });
        
        reader.readAsText(myFile);
        
      }  
});
