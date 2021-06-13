

function GenerarDescarga(){
    if(tab==1){
        download(editor.getValue(),"XML-FILE.xml","text/xml");
    } else if(tab==2){
        download(editor2.getValue(),"XML-FILE.xml","text/xml");
    } else if(tab==3){
        download(editor3.getValue(),"XML-FILE.xml","text/xml");
    } else if(tab==4){
        download(editor4.getValue(),"XML-FILE.xml","text/xml");
    }
}

function LimpiarXML(){
    if(tab==1){
        editor.setValue("");
    } else if(tab==2){
        editor2.setValue("");
    } else if(tab==3){
        editor3.setValue("");
    } else if(tab==4){
        editor4.setValue("");
    }
}

function LimpiarXPath(){
    EntradaXPath.setValue("");
}


function download(text, name, type) {
    var a = document.getElementById("guardar-xml");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
  }


function GenerarDescargaXPath(){
        download2(EntradaXPath.getValue(),"XPath-FILE.xml","text/xml");
}


function download2(text, name, type) {
    var xAux = document.getElementById("guardar-xpath");
    var file = new Blob([text], {type: type});
    xAux.href = URL.createObjectURL(file);
    xAux.download = name;
  }

