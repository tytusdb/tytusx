
var resultXML = 0;
var Pxml = false;
var dot = "";

window.addEventListener('load', function(event) { 
    createXpathArea();
});

var contador=0;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

// ---------------------------- Agregar Pesta;a 

function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=123;
    ta.rows=30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "monokai",
        mode: "xml"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

// ---------------------------------- Quitar Pesta;a 

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}

// ---
/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "monokai",
            mode: "xml"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual
    console.log(contenido);
    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".xml";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}


///
/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "monokai",
            mode: "xml"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

// ---------- Agregar el editor de xpath 
function createXpathArea(){
    var tact =document.getElementById('xpathArea');
    var editor = CodeMirror.fromTextArea(document.getElementById("xpathArea"), {
        lineNumbers: true,
        value: "",
        matchBrackets: true,
        styleActiveLine: true,
        theme: "monokai",
        mode: "xquery"
    }).on('change', editor => {
        tact.value="";
    });

}


function openXpath(files){

    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var parent =document.getElementById('area-input-box');
        var textarea = document.getElementById('xpathArea');
        textarea.value = e.target.result;

        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
  
        
        parent.appendChild(textarea);
        var editor=CodeMirror(parent, {
            lineNumbers: true,
            value: textarea.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "monokai",
            mode: "xquery"
        }).on('change', editor => {
            textarea.value=editor.getValue();
        });
    };
        
    reader.readAsText(file);
    file.clear;
    //Limpiar el input area 
    document.getElementById('fileInput2').value="";

}




// --------------------------------------
// pOST METHOD 



var resultJs = {};

function compile(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual
    resultXML = xmlA.parse(contenido);
    alert("Ejecucion realizada");
    document.getElementById("xml-output").innerHTML  = `=> Su compilacion ha sido exitosa ,
=> Puede descargar sus archivos`;
}   

function reporteTabla(){
    if(resultXML.Lobjetos!=undefined || resultXML.Lobjetos!=null ){
        var global = new Simbolo("global","",4,0,0,null); 
        resultXML.Lobjetos.forEach(element => {
            element.ejecutar(global.entorno, resultXML.errores);
        });
        var rep = reporteTS(global);
        saveReport('TablaSimbolosXML',rep,'html','text/html')
    }
    else{
        alert('Analice una entrada primero')
    }
}
function reporteTS(entorno){
    var dot = ` <!DOCTYPE html>
    <html>
        <head>
            <style> table.GeneratedTable { width: 100%;
                                           background-color: #ffffff;
                                           border-collapse: collapse;
                                           border-width: 2px; 
                                           font-family: ARIAL;
                                           border-color:#f1d152;
                                           border-style: solid;
                                           color: #000000;
                                        }
                   table.GeneratedTable td, table.GeneratedTable th {
                                                                        border-width: 2px; 
                                                                        border-color: #f1d152; 
                                                                        border-style: solid;padding: 3px;
                                                                    } 
                    table.GeneratedTable thead  {background-color: #f1d152;}
                    </style>
        <title>"Tabla de Simbolos"</title>
        </head>
    <body>
        <table class="GeneratedTable">
            <thead>`
    dot+="<tr>"
    dot+="<td>Nombre</td>"
    dot+="<td>Tipo</td>"
    dot+="<td>Valor</td>"
    dot+="<td>Ambito</td>"
    dot+="<td>fila</td>"
    dot+="<td>columna</td>"
    dot+="</tr></thead>\n<tbody>"
    dot+= entorno.getTabla();
    dot += "</tbody></table></body></html>"
    return dot;
  }

// -----------------------------------
//Hay que hacer todos los metodos para validar quese estab trabajando sobre un editor especifico 
function saveReport(name,contenido,extension,typein){

    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=name+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre=extension+"rep_"+formato+"."+extension;//nombre del archivo
    var file=new Blob([contenido], {type: typein});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }


}

//Esto genera el reporte que se necesita 0 para los errores y  1 para gramatica
function getReportHtml(result, type, lenguaje){
        //Error
        console.log("%c Se esta generando su reporte html ...","color:green;");
        if(type == 0 ){                 
                const a = gettHtml(result,type, '#f1d152',`Lista de errores ${lenguaje}`);
                saveReport('Errores', a,'html','text/html');
        }
        //Gramatica
        else{
                const a = gettHtml(result,type, "#3b90ff",`Gramatica ${lenguaje}`);
                saveReport('Gramatical', a, 'html','text/html');
        }
}

function gettHtml(list,type,col,tit){
  const tipo =  type; 
  const color = col;
  const  titulo = tit;  
  
  var htmlBody =  `
  <!DOCTYPE html>
    <html>
        <head>
            <style> table.GeneratedTable { width: 100%;
                                           background-color: #ffffff;
                                           border-collapse: collapse;
                                           border-width: 2px; 
                                           font-family: ARIAL;
                                           border-color:${color};
                                           border-style: solid;
                                           color: #000000;
                                        }
                   table.GeneratedTable td, table.GeneratedTable th {
                                                                        border-width: 2px; 
                                                                        border-color:${color}; 
                                                                        border-style: solid;padding: 3px;
                                                                    } 
                    table.GeneratedTable thead  {background-color: ${color};}
                    </style>
        <title>"${titulo}"</title>
        </head>
    <body>
        <table class="GeneratedTable">
            <thead>
                 <tr>`;
        //Si es tipo 0 es porque es de errores 
        if (tipo ==  0)
            htmlBody +=" <th>No.</th> <th>Tipo Error</th>  <th>Fila</th>  <th>Columna</th> <th>Descripcion</th> <th>Lexema</th>\n";
        else
            htmlBody +="<th>No.</th>   <th>Produccion</th>  <th>Regla</th>";             
        htmlBody += "</tr></thead>\n<tbody>";

        if(tipo == 0){
            for (var i = 0; i < list.length; i++){
                htmlBody +=  `
                <tr> <td> ${i} </td> <td>  ${list[i].tipo} </td> <td>  ${list[i].fila} </td> <td>  ${list[i].columna}  </td> <td>   ${list[i].desc} </td> <th> ${list[i].lexema}</th></tr>`;
            } 
        }else{
            for (var i = 0; i < list.length; i++){
                htmlBody +=  `
                <tr> <td> ${i} </td> <td>  ${list[i].produccion} </td> <td>  ${list[i].regla} </td> </tr>`;
            }     
        }
        
        htmlBody +=  "\n</tbody></table></body></html>";
        return htmlBody;
}

function ReportXml(opcion){

    if(resultXML.errores!=undefined || resultXML.errores!=null){
        //Reporte de errores 
        if(opcion == 0){
            getReportHtml(resultXML.errores,0,"xml");
        }
        //Reporte de gramatica 
        else if(opcion == 1) 
            getReportHtml(resultXML.repA,1,"xml");
    }
    else{
        alert('Analice una entrada primero')
    }
}

function showDot(){
    console.log(dot);
    const container = document.getElementById("grafo");
    var parsedData = vis.network.convertDot(dot);

    var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
    };

    var options = parsedData.options;
    options.nodes = {
    color: "blue"
    };
    var network = new vis.Network(container, data, options);
     
}


function getArbolXML(tipo) {
    if(resultXML.Lobjetos!= undefined || resultXML.Lobjetos!=null){
        try {
            var raiz = new NodoAST("S");
            resultXML.Lobjetos.forEach(element => {
              if(tipo){
                  raiz.addHijo(element.getAST());
              }else{
                  raiz.addHijo(element.getCST());
              }
            });
            getDot(raiz);
            showDot();
          } catch (error) {
             dot=""
             showDot();
          }
    }
}

function getDot(raiz) {
    try {
        dot = "";
        dot += "digraph {\n";
        dot += 'n0[label="' + raiz.getDato() + '"];\n';
        this.contador = 1;
        getNodos("n0", raiz);
        dot += "}";
    } catch (error) {
        dot = " ";
    }
}
function getNodos(number,nodo) {
    try {
        for (let hoja of nodo.getHojas()) {
            if (hoja != undefined) {
                var nombreHijo = "n" + this.contador; this.contador++;
                dot += nombreHijo + '[label="' + hoja.getDato() + '"];\n';
                dot += number + "->" + nombreHijo + ";\n";
                getNodos(nombreHijo, hoja);
            }
        }
    } catch (error) {

    }
}