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
        $(pestanna1).css('background','#70DB93');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);/*esta forma jala el texto del area*/

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "darcula",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
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
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "darcula",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}
function consola(){
    var x = document.createElement("TEXTAREA");
    var t = document.createTextNode("Aklhvb");
    
    x.appendChild(t);
    document.body.appendChild(x);
    }


function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}


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
            theme: "darcula",
            mode: "text/x-java"
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
function GuardarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre=""+formato+".java";//nombre del archivo
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

function DescargarArchivo(){
    //var ta=document.getElementById("cons");
    //var contenido=ta.value;//texto de vent actual
    var contenido=Reporte_Clases;
    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato="doc"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".jss";//nombre del archivo
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

var contenidoErrores;


/*------------------------- Prueba de conexion -----------------------------------------------------*/
var cont =0;
var tablaGeneral =[];
var tablaLocal =[];
var arbolDesimbolo;
var entornoAnterior="Global";
var simboloAnterior;
var textopagina="";
var contenido="";
var codificacion="UTF-8"

//let entornoGlobal;
let p = new producion();

const analizarTexto = () => {
    //analizar y ejecutar
    var ta = document.getElementById(get_vent());
    var contenido = ta.value;

    contenidoErrores="";
        Errores.clear();
    try {
        
      let result = gramaticaXML.parse(contenido);//<----------------- Arbol generado del analizador ascendente
        guardarTabla=result;//<---------------------------- Aqui esta la tabla de simbolos
        arbolito=result;
        tabla="";

        agregarTablaSimbolos(arbolito);
        console.log(arbolito);
        GenerarReporteTabla();
        //recorreTablaExpresiones("titulo",guardarTabla)//prueba de entrada-->   //titulo
       // reconocerCaso(pruebaDeQuery,arbolito)


        recorreTabla("TITLE",arbolito)//prueba de entrada-->   //titulo
    
     


        if (contenido.includes('ASCII')||contenido.includes('ascii')){
            codificacion='ASCII'
            
        }else if(contenido.includes('UTF-8')||contenido.includes('utf-8')){
            codificacion='UTF-8'
        }else if(contenido.includes('ISO-8859-1')||contenido.includes('iso-8859-1')){
            codificacion='ISO-8859-1'
        }
        imprimirEnConsola(salida)
        busqueda = new busqueda(result)
        search=busqueda


        if(!Errores.Vacio()){
            console.log("vacio we")
        }else{
            contenidoErrores= Errores.mostrar_Lista()
        }

       // busqueda= new busqueda(guardarTabla);
        
       


    } catch (error) {
      console.log(error);
    }
  }
  
  function codificacionEnviar(cadena){
    try {
       var acumular= cadena;
       var acumularUTF8 = "";
       var acumularISO = "";
       var retorno="";

       switch(codificacion) {
           case "UTF-8":
            acumularUTF8 = decodeURIComponent(acumular);
            acumularISO = decodeURIComponent(escape(acumularUTF8));
               acumular = acumularISO;
             break;
           case "ISO-8859-1": 
           acumularUTF8 = unescape(encodeURIComponent(acumular));
               acumular = acumularUTF8;
             break;
            case "ASCII":
                for (let index = 0; index < cadena.length; index++) {
                   retorno+=cadena[index].charCodeAt()+' '

                }
                console.log(retorno)
                cadena=retorno
                break;
           default:
            acumularUTF8 = decodeURIComponent(acumular);
            acumularISO = decodeURIComponent(escape(acumularUTF8));
            acumular = acumularISO;
         }
       return acumular;
    } catch (error) {
        console.log(error);
        return cadena
    }
   }
   function imprimirEnConsola(cadena){

       var c =document.getElementById("cons").value = codificacionEnviar(salida).replace('undefined','');
   }
function GenerarReporteTabla(){
    texto=""
    texto = "<!DOCTYPE html> ";
    texto+="<html lang=\"en\">";
    texto+="<head>";
    texto+="<meta charset=\"UTF-8\">";
    texto+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    texto+="<title>Reporte Tabla de simbolos</title>";
    texto+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
    texto+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
    texto+="</head>";
    texto+="<body>";
    texto+="<H1>Lista de Simbolos</H1>";
    texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
    texto+="<tr> \n";
    texto+= "<th scope=\"col\">ID</th> \n";
    texto+= "<th scope=\"col\">Tipo</th> \n";
    texto+= "<th scope=\"col\">valor</th> \n";
    texto+= "<th scope=\"col\">Fila</th> \n";
    texto+= "<th scope=\"col\">Columna</th> \n";
    texto+= "<th scope=\"col\">Entorno</th> \n";
    texto+= "</tr> \n";
    texto+= "</thead> \n";
    texto+= "<tbody>";
    texto+= tabla;
                    texto+= "</tbody> \n";
                    texto+= "</table> \n";
                
                    texto+="</body>";
                    texto+="</html>";
};

function Reporte_Errores(){

    var nueva_ventana = window.open('../Reporte_Errores','_blank');
    nueva_ventana.document.write(contenidoErrores);

}
var textopagina;
function Pagina_Reporte_AST(){

    textopagina="<!DOCTYPE html>";
    textopagina += "<html lang=\"en\">";
    textopagina += "<head>";
    textopagina += " <title>Reporte AST</title>";
    textopagina += "<meta charset=\"utf-8\">";
    textopagina += " <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";

    textopagina += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/tablesort/4.1.0/tablesort.min.js\"></script>";
    textopagina += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/tablesort/4.1.0/src/sorts/tablesort.number.js\"></script>";
    textopagina += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/viz.js/1.3.0/viz.js\"></script>";
    textopagina +=" <script src='./XML_Ascendente/CST/prueba.js'></script>"
    textopagina += "</head>";
    textopagina += "<body>";
    textopagina += "<div class=\"container\">";
    textopagina += "<h1>Display</h1>";
    textopagina += "<div id=\"jstree-tree\"></div>";

    
    textopagina+="<button onclick=\"pruebaGraficarXML("+arbolito+")\"  id=\"btn22\" class=\"btnp\">CST Asc</button>"
    textopagina+="<div id=\"grafoXML\"> </div>";

    textopagina += "</body>";
    textopagina += "</html>";

}

function Reporte_gramaticales(){
   
    GenerarReporteGramatical()
    var nueva_ventana = window.open('../Reporte_Gramatical','_blank');
    nueva_ventana.document.write(textoGramatical);

}
function Reporte_TablaV2(){
    tabla="";
    texto="";
    entornoAnterior="Global"
    agregarTablaSimbolos3(arbolito);
    GenerarReporteTabla()
    var nueva_ventana = window.open('../Reporte_Tabla','_blank');
    nueva_ventana.document.write(texto);
}

function Reporte_Tabla(){
    tabla="";
    texto="";
    entornoAnterior="Global"
    agregarTablaSimbolos(arbolito);
    console.log(arbolito)
    GenerarReporteTabla()
    var nueva_ventana = window.open('../Reporte_Tabla','_blank');
    nueva_ventana.document.write(texto);


}
function Reporte_CST(){
    pruebaGraficarXML()
    cstXML=""
    var direccion = encodeURI("https://dreampuf.github.io/GraphvizOnline/#" + otra(arbolito));
    window.open(direccion, '_blank');
   // var nueva_ventana = window.open('./Reportes/Reporte_AST.html','_blank');
    //nueva_ventana.document.open();


}
function AnalizarX(){
    var ta = document.getElementById(get_vent());
    var contenido = ta.value;
    AnalizarXpath(contenido)
}

document.getElementById("boton").addEventListener("click",analizarTexto);